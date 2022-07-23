using Microsoft.EntityFrameworkCore;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Payment;

public class PaymentTimerService : BackgroundService
{
    private readonly ILogger<PaymentTimerService> _logger;
    private readonly IServiceScopeFactory _factory;

    public PaymentTimerService(ILogger<PaymentTimerService> logger,  IServiceScopeFactory factory)
    {
        _logger = logger;
        _factory = factory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("PaymentTimerService running");

        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _factory.CreateScope())
            {
                var db = scope.ServiceProvider.GetService<ApplicationDbContext>();
                var allRentAgreements = await db.RentAgreements
                    .Select(r => new { r, MonthsPassed = ((DateTime.Today.Year - r.Date.Year) * 12) + DateTime.Today.Month - r.Date.Month  })
                    .Select(o => new { o.r, CurrentPeriod = o.r.Date.AddMonths(o.MonthsPassed) })
                    .Select(o => new {o.r, PaymentInThisPeriod = o.r.Payments.FirstOrDefault(p => p.PeriodStart.AddDays(-2) <= o.CurrentPeriod && p.PeriodEnd >= o.CurrentPeriod)})
                    .Where(o => o.PaymentInThisPeriod == null)
                    .Select(o => o.r)
                    .ToListAsync();

                foreach (var agreement in allRentAgreements)
                {
                    var currentPeriod = agreement.Date.AddMonths(((DateTime.Today.Year - agreement.Date.Year) * 12) + DateTime.Today.Month - agreement.Date.Month);
                    
                    var newPayment = new RentPayment()
                    {
                        Payment = agreement.PaymentPerMonth,
                        PeriodStart = currentPeriod,
                        PeriodEnd = currentPeriod.AddMonths(1).AddDays(-1),
                        DueDate = currentPeriod.AddMonths(1).AddDays(1),
                        PaymentState = PaymentState.NotPaid,
                        RentAgreement = agreement
                    };

                    db.RentPayments.Add(newPayment);
                    _logger.LogInformation("PaymentTimerService created new payment for {agreement} [CurrentPeriod: {current}] (PeriodStart: {periodStart}, PeriodEnd: {periodEnd})", agreement.Id, currentPeriod, newPayment.PeriodStart, newPayment.PeriodEnd);
                }
                
                if (allRentAgreements.Count() > 0) await db.SaveChangesAsync();
            }
        
            await Task.Delay(1000, stoppingToken);
        }
        
        _logger.LogInformation("PaymentTimerService stopped");
    }
}