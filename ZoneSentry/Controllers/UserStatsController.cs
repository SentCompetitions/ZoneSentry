using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Controllers;

[Authorize("User")]
[Route("api/[controller]")]
[ApiController]
public class UserStatsController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserStatsController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet("charts")]
    public async Task<ActionResult<List<StatsEntry>>> GetStats(int? realtyId)
    {
        var allProfitableRentPayments = _db.RentPayments.Where(p => (realtyId != null ? p.RentAgreement.Realty.Id == realtyId : true) && p.RentAgreement.Realty.Owner == HttpContext.GetUser());
        var allUnProfitableRentPayments = _db.RentPayments.Where(p => (realtyId != null ? p.RentAgreement.Realty.Id == realtyId : true) && p.RentAgreement.Tenant == HttpContext.GetUser());

        var allUnProfitableServicesPayments = _db.RealtyServicePayments.Where(p => (realtyId != null && p.RealtyServiceOrder != null ? p.RealtyServiceOrder.Realty.Id == realtyId : true) && p.Orderer == HttpContext.GetUser());

        var allUnProfitableRentPaymentsPoints = new StatsEntry()
        {
            Name = "Расходы на аренду", Points = await allUnProfitableRentPayments.GroupBy(p => p.PeriodStart).Select(
                g => new Point()
                {
                    X = g.Key,
                    Y = g.Sum(p => p.Payment)
                }).ToListAsync()
        };
        var allUnProfitableServicesPaymentsPoints = new StatsEntry()
        {
            Name = "Расходы на услуги", Points = await allUnProfitableServicesPayments.GroupBy(p => p.PeriodStart)
                .Select(g => new Point()
                {
                    X = g.Key,
                    Y = g.Sum(p => p.Payment)
                }).ToListAsync()
        };

        return new List<StatsEntry>()
        {
            new()
            {
                Name = "Доходы от аренды", Points = await allProfitableRentPayments.GroupBy(p => p.PeriodStart).Select(
                    g => new Point()
                    {
                        X = g.Key,
                        Y = g.Sum(p => p.Payment)
                    }).ToListAsync()
            },
            allUnProfitableRentPaymentsPoints,
            allUnProfitableServicesPaymentsPoints,
            new()
            {
                Name = "Общие расходы", Points = allUnProfitableRentPaymentsPoints.Points.Concat(allUnProfitableServicesPaymentsPoints.Points)
                    .GroupBy(p => p.X).Select(g => new Point()
                    {
                        X = g.Key,
                        Y = g.Sum(p => p.Y)
                    })
                    .ToList()
            }
        };
    }

    [HttpGet("score/{userId}")]
    public async Task<ActionResult<float>> GetUserScore(int userId)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return NotFound();
        
        var allUnProfitableRentPayments = _db.RentPayments.Where(p => p.RentAgreement.Tenant == user);
        var allUnProfitableServicesPayments = _db.RealtyServicePayments.Where(p => p.Orderer == user);

        var rentScore = allUnProfitableRentPayments.Count() != 0 
            ? allUnProfitableRentPayments.Where(p => p.PaymentDate < p.PeriodEnd).Count() / (float)allUnProfitableRentPayments.Count() 
            : 1f;
        
        var serviceScoreScore = allUnProfitableServicesPayments.Count() != 0 
            ? allUnProfitableServicesPayments.Where(p => p.PaymentDate < p.PeriodEnd).Count() / (float)allUnProfitableServicesPayments.Count() 
            : 1f;

        return (rentScore + serviceScoreScore) / 2f;
    }
}