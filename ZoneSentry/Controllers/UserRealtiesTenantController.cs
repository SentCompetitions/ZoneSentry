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
public class UserRealtiesTenantController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserRealtiesTenantController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<RealtyUserView>>> GetRentedRealties()
    {
        var owned = _db.Realties.Where(r => r.RentAgreements.FirstOrDefault(a => a.Date > DateTime.Now && a.ExpirationDate < DateTime.Now).Tenant == HttpContext.GetUser());

        return await _mapper.ProjectTo<RealtyUserView>(owned).ToListAsync();
    }

    [HttpPost("requestRent")]
    public async Task<ActionResult> RequestRent(RentRequestCreate create)
    {
        var realty = await _db.Realties.FirstOrDefaultAsync(r => r.Id == create.RealtyId && r.RealtyStatus == RealtyStatus.ForRent);
        if (realty == null) return BadRequest();
        
        var request = await _db.RentRequests.FirstOrDefaultAsync(r => r.Tenant == HttpContext.GetUser() && r.Realty == realty);
        if (request != null) return BadRequest();

        var newRequest = new RentRequest()
        {
            Realty = realty,
            Tenant = HttpContext.GetUser(),
            DurationInMonths = create.DurationInMonths,
            PaymentPerMonth = realty.PaymentPerMonth ?? 0
        };

        _db.RentRequests.Add(newRequest);

        await _db.SaveChangesAsync();
        
        return Ok();
    }
}