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
public class UserRealtiesOwnerController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserRealtiesOwnerController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<RealtyUserView>>> GetOwnedRealties()
    {
        var owned = _db.Realties.Where(r => r.Owner == HttpContext.GetUser());

        return await _mapper.ProjectTo<RealtyUserView>(owned).ToListAsync();
    }
    
    #region rentRequests
    [HttpGet("rentRequests")]
    public async Task<ActionResult<List<RentRequestDTO>>> GetRentRequests()
    {
        var owned = _db.Realties.Where(r => r.Owner == HttpContext.GetUser());

        return await _mapper.ProjectTo<RentRequestDTO>(owned.SelectMany(r => r.RentRequests)).ToListAsync();
    }
    
    [HttpPost("rentRequests/accept/{id}")]
    public async Task<ActionResult> AcceptRentRequest(int id)
    {
        var request = await _db.RentRequests.Include(r => r.Tenant).Include(r => r.Realty.Owner).FirstOrDefaultAsync(r => r.Id == id && r.Realty.Owner == HttpContext.GetUser());
        if (request == null) return NotFound();

        var newAgreement = new RentAgreement()
        {
            Date = DateTime.Today,
            ExpirationDate = DateTime.Today.AddMonths(request.DurationInMonths),
            Owner = request.Realty.Owner,
            Tenant = request.Tenant,
            OwnedByCompany = false,
            PaymentPerMonth = request.PaymentPerMonth,
            Realty = request.Realty
        };

        _db.RentRequests.Remove(request);
        _db.RentAgreements.Add(newAgreement);

        await _db.SaveChangesAsync();

        return Ok();
    }
    #endregion rentRequests

    #region purchaseRequest
    [HttpPost("requestPurchase")]
    public async Task<ActionResult> RequestPurchase(PurchaseRequestCreate create)
    {
        var realty = await _db.Realties.FirstOrDefaultAsync(r => r.Id == create.RealtyId && r.RealtyStatus == RealtyStatus.ForSale);
        if (realty == null) return NotFound();
        
        var request = await _db.PurchaseRequests.FirstOrDefaultAsync(r => r.NewOwner == HttpContext.GetUser() && r.Realty == realty);
        if (request != null) return BadRequest();

        var newRequest = new PurchaseRequest()
        {
            Realty = realty,
            NewOwner = HttpContext.GetUser(),
            SellCost = realty.SellCost ?? 0
        };

        _db.PurchaseRequests.Add(newRequest);

        await _db.SaveChangesAsync();
        
        return Ok();
    }
    
    [HttpGet("rentPurchase")]
    public async Task<ActionResult<List<PurchaseRequestDTO>>> GetPurchaseRequests()
    {
        var owned = _db.Realties.Where(r => r.Owner == HttpContext.GetUser());

        return await _mapper.ProjectTo<PurchaseRequestDTO>(owned.SelectMany(r => r.PurchaseRequests)).ToListAsync();
    }
    
    [HttpPost("rentPurchase/accept/{id}")]
    public async Task<ActionResult> AcceptPurchaseRequest(int id)
    {
        var request = await _db.PurchaseRequests.Include(r => r.Realty.RentAgreements).Include(r => r.NewOwner).Include(r => r.Realty.Owner).FirstOrDefaultAsync(r => r.Id == id && r.Realty.Owner == HttpContext.GetUser());
        if (request == null) return NotFound();
        if (request.Realty.CurrentRentAgreement != null) return BadRequest("CurrentRentAgreement exists");

        request.Realty.Owner = request.NewOwner;
        request.Realty.OwnedByCompany = false;
        request.Realty.RealtyStatus = RealtyStatus.NotForSale;
        
        _db.PurchaseRequests.Remove(request);

        await _db.SaveChangesAsync();

        return Ok();
    }
    #endregion purchaseRequest
    
    [HttpGet("rentPayments")]
    public async Task<ActionResult<List<RentPaymentUserView>>> GetRentPayments(int? realtyId)
    {
        var agreements = _db.RentAgreements.Where(a => a.Owner == HttpContext.GetUser() && a.Date < DateTime.Now && a.ExpirationDate > DateTime.Now);

        if (realtyId != null) agreements = agreements.Where(a => a.Realty.Id == realtyId);

        var payments = agreements.SelectMany(a => a.Payments).OrderBy(a => a.PaymentState).Include(p => p.RentAgreement.Realty);

        return await _mapper.ProjectTo<RentPaymentUserView>(payments).ToListAsync();
    }
}