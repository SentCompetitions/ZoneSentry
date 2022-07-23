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
public class ConstructionCompanyRequestsController: ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public ConstructionCompanyRequestsController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    [HttpGet("rentRequests")]
    public async Task<ActionResult<List<RentRequestDTO>>> GetRentRequests()
    {
        var owned = _db.Realties.Where(r => r.OwnedByCompany && r.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));

        return await _mapper.ProjectTo<RentRequestDTO>(owned.SelectMany(r => r.RentRequests)).ToListAsync();
    }
    
    [HttpPost("rentRequests/accept/{id}")]
    public async Task<ActionResult> AcceptRentRequest(int id)
    {
        var request = await _db.RentRequests.Include(r => r.Tenant).Include(r => r.Realty).FirstOrDefaultAsync(r => r.Id == id &&  r.Realty.OwnedByCompany && r.Realty.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
        if (request == null) return NotFound();

        var newAgreement = new RentAgreement()
        {
            Date = DateTime.Today,
            ExpirationDate = DateTime.Today.AddMonths(request.DurationInMonths),
            Tenant = request.Tenant,
            OwnedByCompany = true,
            PaymentPerMonth = request.PaymentPerMonth,
            Realty = request.Realty
        };

        _db.RentRequests.Remove(request);
        _db.RentAgreements.Add(newAgreement);

        await _db.SaveChangesAsync();

        return Ok();
    }
    
    [HttpGet("purchaseRequests")]
    public async Task<ActionResult<List<PurchaseRequestDTO>>> GetPurchaseRequests()
    {
        var owned = _db.Realties.Where(r => r.OwnedByCompany && r.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));

        return await _mapper.ProjectTo<PurchaseRequestDTO>(owned.SelectMany(r => r.PurchaseRequests)).ToListAsync();
    }
    
    [HttpPost("purchaseRequests/accept/{id}")]
    public async Task<ActionResult> AcceptPurchaseRequest(int id)
    {
        var request = await _db.PurchaseRequests.Include(r => r.Realty.RentAgreements).Include(r => r.NewOwner).Include(r => r.Realty).FirstOrDefaultAsync(r => r.Id == id &&  r.Realty.OwnedByCompany && r.Realty.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
        if (request == null) return NotFound();
        if (request.Realty.CurrentRentAgreement != null) return BadRequest("CurrentRentAgreement exists");

        request.Realty.Owner = request.NewOwner;
        request.Realty.OwnedByCompany = false;
        request.Realty.RealtyStatus = RealtyStatus.NotForSale;
        
        _db.PurchaseRequests.Remove(request);

        await _db.SaveChangesAsync();

        return Ok();
    }
    
    [HttpGet("realties/{id}/available")]
    public async Task<ActionResult<List<RealtyServiceDTO>>> AvalibleServices(int id)
    {
        var realty = await _db.Realties.Include("Services.RealtyService").Include(r => r.House).FirstOrDefaultAsync(r => r.Id == id && r.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
        if (realty == null) return NotFound();
        
        return await _mapper.ProjectTo<RealtyServiceDTO>(_db.RealtyServices.Where(s => s.Scope.Contains(realty.House) && !realty.Services.Select(o => o.RealtyService).Contains(s))).ToListAsync();
    }
    
    [HttpGet("realties/{id}/ordered")]
    public async Task<ActionResult<List<RealtyServiceOrderDTO>>> OrderedServices(int id)
    {
        var realty = await _db.Realties.Include(r => r.House).FirstOrDefaultAsync(r => r.Id == id && r.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
        if (realty == null) return NotFound();

        return await _mapper.ProjectTo<RealtyServiceOrderDTO>(_db.RealtyServiceOrders.Where(s => s.Realty == realty)).ToListAsync();
    }
    
    [HttpPost("realties/{realtyId}/realtyServices/{serviceId}/request")]
    public async Task<ActionResult> RequestRealtyService(int realtyId, int serviceId)
    {
        var realty = await _db.Realties.Include(r => r.House).FirstOrDefaultAsync(r => r.Id == realtyId && r.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
        if (realty == null) return NotFound();

        var service = await _db.RealtyServices.FirstOrDefaultAsync(s => s.Id == serviceId && s.Scope.Contains(realty.House));
        if (service == null) return NotFound();

        var request = await _db.RealtyServiceRequests.FirstOrDefaultAsync(r => r.Realty == realty && r.RealtyService == service);
        if (request != null) return BadRequest();
        
        var order = await _db.RealtyServiceOrders.FirstOrDefaultAsync(r => r.Realty == realty && r.RealtyService == service);
        if (order != null) return BadRequest();

        var newRequest = new RealtyServiceRequest()
        {
            Realty = realty,
            RealtyService = service,
            Orderer = null,
            CompanyOrdered = true
        };

        _db.RealtyServiceRequests.Add(newRequest);
        await _db.SaveChangesAsync();
        
        return Ok();
    }
}