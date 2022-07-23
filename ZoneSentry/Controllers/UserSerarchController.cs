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
public class UserSerarchController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserSerarchController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    [HttpPost]
    public async Task<ActionResult<List<RealtyUserView>>> Serarch(SearchFilters filters)
    {
        if (filters.RealtyStatus == RealtyStatus.NotForSale) return BadRequest();

        return await _mapper.ProjectTo<RealtyUserView>(_db.Realties.Where(r =>
            (filters.City != null ? r.House.ResidentialComplex.City == filters.City : true) &&
            (filters.RealtyStatus != null ? r.RealtyStatus == filters.RealtyStatus : r.RealtyStatus != RealtyStatus.NotForSale) &&
            (filters.AreaMax != null ? r.Area <= filters.AreaMax : true) &&
            (filters.AreaMin != null ? r.Area >= filters.AreaMin : true) &&
            (filters.PriceMax != null ? (r.RealtyStatus == RealtyStatus.ForRent ? r.PaymentPerMonth : r.SellCost) <= filters.PriceMax : true) &&
            (filters.PriceMin != null ? (r.RealtyStatus == RealtyStatus.ForRent ? r.PaymentPerMonth : r.SellCost) >= filters.PriceMin : true)
        )).ToListAsync();
    }
}