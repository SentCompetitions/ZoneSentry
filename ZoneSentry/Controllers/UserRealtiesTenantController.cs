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

    [HttpGet("realties")]
    public async Task<ActionResult<List<RealtyUserView>>> GetRentedRealties()
    {
        var rented = _db.Realties.Include("RentAgreements.Tenant").Where(r => r.RentAgreements.FirstOrDefault(a => a.Date < DateTime.Now && a.ExpirationDate > DateTime.Now).Tenant == HttpContext.GetUser());

        return await _mapper.ProjectTo<RealtyUserView>(rented).ToListAsync();
    }

    [HttpGet("realties/{realtyId}")]
    public async Task<ActionResult<RealtyDetails>> GetRentedRealty(int realtyId)
    {
        var realty = await _db.Realties
            .Include("RentAgreements.Tenant")
            .Include(r => r.House.ResidentialComplex.ConstructionCompany)
            .FirstOrDefaultAsync(r => r.Id == realtyId && r.RentAgreements.FirstOrDefault(a => a.Date < DateTime.Now && a.ExpirationDate > DateTime.Now).Tenant == HttpContext.GetUser());
        if (realty == null) return NotFound();

        return _mapper.Map<RealtyDetails>(realty);
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

    [HttpGet("rentPayments")]
    public async Task<ActionResult<List<RentPaymentUserView>>> GetRentPayments(int? realtyId)
    {
        var agreements = _db.RentAgreements.Where(a => a.Tenant == HttpContext.GetUser() && a.Date < DateTime.Now && a.ExpirationDate > DateTime.Now);

        if (realtyId != null) agreements = agreements.Where(a => a.Realty.Id == realtyId);

        var payments = agreements.SelectMany(a => a.Payments).OrderBy(a => a.PaymentState).Include(p => p.RentAgreement.Realty);

        return await _mapper.ProjectTo<RentPaymentUserView>(payments).ToListAsync();
    }

    [HttpPost("rentPayments/{paymentId}/pay")]
    public async Task<ActionResult> PayForRent(int paymentId)
    {
        var payment = await _db.RentPayments.FirstOrDefaultAsync(r => r.Id == paymentId && r.RentAgreement.Tenant == HttpContext.GetUser());
        if (payment == null) return NotFound();
        
        // Здесь долна быть проверка на то что деньги действительно пришли и тд, но мы на хакатоне
        payment.PaymentState = PaymentState.Paid;
        payment.PaymentDate = DateTime.Today;
        await _db.SaveChangesAsync();
        
        return Ok();
    }
}