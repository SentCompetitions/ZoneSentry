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

                #region Rent
                var allRentAgreements = await db.RentAgreements
                    .Select(r => new { r, MonthsPassed = ((DateTime.Today.Year - r.Date.Year) * 12) + DateTime.Today.Month - r.Date.Month - (DateTime.Today.Day < r.Date.Day ? 1 : 0) })
                    .Select(o => new { o.r, CurrentPeriod = o.r.Date.AddMonths(o.MonthsPassed) })
                    .Select(o => new {o.r, PaymentInThisPeriod = o.r.Payments.FirstOrDefault(p => p.PeriodStart.AddDays(-2) <= o.CurrentPeriod && p.PeriodEnd >= o.CurrentPeriod)})
                    .Where(o => o.PaymentInThisPeriod == null)
                    .Select(o => o.r)
                    .ToListAsync();

                foreach (var agreement in allRentAgreements)
                {
                    var currentPeriod = agreement.Date.AddMonths(((DateTime.Today.Year - agreement.Date.Year) * 12) + DateTime.Today.Month - agreement.Date.Month - (DateTime.Today.Day < agreement.Date.Day ? 1 : 0));
                    
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
                    _logger.LogInformation("PaymentTimerService created new rent payment for {agreement} [CurrentPeriod: {current}] (PeriodStart: {periodStart}, PeriodEnd: {periodEnd})", agreement.Id, currentPeriod, newPayment.PeriodStart, newPayment.PeriodEnd);
                }
                #endregion Rent
               
                #region Services
                
                var allServicesOrders = await db.RealtyServiceOrders
                    .Include(r => r.Orderer)
                    .Include(r => r.Realty.House.ResidentialComplex.ConstructionCompany)
                    .Select(r => new { r, MonthsPassed = ((DateTime.Today.Year - r.Date.Year) * 12) + DateTime.Today.Month - r.Date.Month - (DateTime.Today.Day < r.Date.Day ? 1 : 0)  })
                    .Select(o => new { o.r, CurrentPeriod = o.r.Date.AddMonths(o.MonthsPassed) })
                    .Select(o => new {o.r, PaymentInThisPeriod = o.r.Payments.FirstOrDefault(p => p.PeriodStart <= o.CurrentPeriod && p.PeriodEnd >= o.CurrentPeriod)})
                    .Where(o => o.PaymentInThisPeriod == null)
                    .Select(o => o.r)
                    .ToListAsync();
                
                foreach (var order in allServicesOrders)
                {
                    var currentPeriod = order.Date.AddMonths(((DateTime.Today.Year - order.Date.Year) * 12) + DateTime.Today.Month - order.Date.Month - (DateTime.Today.Day < order.Date.Day ? 1 : 0));
                    if (DateTime.Today - currentPeriod < TimeSpan.FromDays(15)) continue;
                    
                    var newPayment = new RealtyServicePayment()
                    {
                        Payment = order.Cost,
                        PeriodStart = currentPeriod,
                        PeriodEnd = currentPeriod.AddMonths(1).AddDays(-1),
                        DueDate = currentPeriod.AddMonths(1).AddDays(1),
                        PaymentState = PaymentState.NotPaid,
                        RealtyServiceOrder = order,
                        Orderer = order.Orderer,
                        ConstructionCompany = order.CompanyOrdered ? order.Realty.House.ResidentialComplex.ConstructionCompany : null
                    };

                    db.RealtyServicePayments.Add(newPayment);
                    _logger.LogInformation("PaymentTimerService created new service payment for {order} [CurrentPeriod: {current}] (PeriodStart: {periodStart}, PeriodEnd: {periodEnd})", order.Id, currentPeriod, newPayment.PeriodStart, newPayment.PeriodEnd);
                }
                
                #endregion Services
                
                if (allRentAgreements.Count() > 0 || allServicesOrders.Count() > 0) await db.SaveChangesAsync();
            }
        
            await Task.Delay(1000, stoppingToken);
        }
        
        _logger.LogInformation("PaymentTimerService stopped");
    }
}