using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Controllers;


[Authorize("CompanyEmployee")]
[Route("api/[controller]")]
[ApiController]
public class ConstructionCompanyStats: ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public ConstructionCompanyStats(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    [HttpGet("charts")]
    public async Task<ActionResult<List<StatsEntry>>> GetStats(int? realtyId)
    {
        var allProfitableRentPayments = _db.RentPayments.Where(p => (realtyId != null ? p.RentAgreement.Realty.Id == realtyId : true) && p.RentAgreement.Realty.OwnedByCompany && p.RentAgreement.Realty.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
        
        var allUnProfitableServicesPayments = _db.RealtyServicePayments.Where(p => (realtyId != null && p.RealtyServiceOrder != null ? p.RealtyServiceOrder.Realty.Id == realtyId : true) && p.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
        
        return new List<StatsEntry>()
        {
            new() {Name = "Доходы от аренды", Points = await allProfitableRentPayments.GroupBy(p => p.PeriodStart).Select(g => new Point()
            {
                X = g.Key,
                Y = g.Sum(p => p.Payment)
            }).ToListAsync()},
            new() {Name = "Расходы на услуги", Points = await allUnProfitableServicesPayments.GroupBy(p => p.PeriodStart).Select(g => new Point()
            {
                X = g.Key,
                Y = g.Sum(p => p.Payment)
            }).ToListAsync()}
        };
    }
}