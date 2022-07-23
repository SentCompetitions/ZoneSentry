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
public class UserRealtiesServicesTenantController: ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserRealtiesServicesTenantController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    [HttpGet("realties/{id}/available")]
    public async Task<ActionResult<List<RealtyServiceDTO>>> AvalibleServices(int id)
    {
        var rented = _db.Realties.Where(r => r.RentAgreements.FirstOrDefault(a => a.Date < DateTime.Now && a.ExpirationDate > DateTime.Now).Tenant == HttpContext.GetUser());
        var realty = await _db.Realties.Include("Services.RealtyService").Include(r => r.House).FirstOrDefaultAsync(r => r.Id == id && rented.Contains(r));
        if (realty == null) return NotFound();
        
        return await _mapper.ProjectTo<RealtyServiceDTO>(_db.RealtyServices.Where(s => s.Scope.Contains(realty.House) && !realty.Services.Select(o => o.RealtyService).Contains(s))).ToListAsync();
    }
    
    [HttpGet("realties/{id}/ordered")]
    public async Task<ActionResult<List<RealtyServiceOrderDTO>>> OrderedServices(int id)
    {
        var rented = _db.Realties.Where(r => r.RentAgreements.FirstOrDefault(a => a.Date < DateTime.Now && a.ExpirationDate > DateTime.Now).Tenant == HttpContext.GetUser());
        var realty = await _db.Realties.Include(r => r.Services).FirstOrDefaultAsync(r => r.Id == id && rented.Contains(r));
        if (realty == null) return NotFound();

        return await _mapper.ProjectTo<RealtyServiceOrderDTO>(_db.RealtyServiceOrders.Where(s => s.Realty == realty)).ToListAsync();
    }
    
    [HttpPost("realties/{realtyId}/realtyServices/{serviceId}/request")]
    public async Task<ActionResult> RequestRealtyService(int realtyId, int serviceId)
    {
        var rented = _db.Realties.Where(r => r.RentAgreements.FirstOrDefault(a => a.Date < DateTime.Now && a.ExpirationDate > DateTime.Now).Tenant == HttpContext.GetUser());
        var realty = await _db.Realties.Include(r => r.House).FirstOrDefaultAsync(r => r.Id == realtyId && rented.Contains(r));
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
            Orderer = HttpContext.GetUser(),
            CompanyOrdered = false
        };

        _db.RealtyServiceRequests.Add(newRequest);
        await _db.SaveChangesAsync();
        
        return Ok();
    }
}