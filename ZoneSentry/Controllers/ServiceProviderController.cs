using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Controllers;


[Authorize("ServiceProvider")]
[Route("api/[controller]")]
[ApiController]
public class ServiceProviderController: ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public ServiceProviderController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet("services")]
    public async Task<ActionResult<List<RealtyServiceDTO>>> GetServices()
    {
        return await _mapper.ProjectTo<RealtyServiceDTO>(_db.RealtyServices.Where(s => s.Provider == HttpContext.GetUser())).ToListAsync();
    }
    
    [HttpPut("services/{id}")]
    public async Task<ActionResult> UpdateService(int id, RealtyServiceUpdate update)
    {
        if (id != update.Id) return BadRequest();

        var service = await _db.RealtyServices.FirstOrDefaultAsync(s => s.Id == id && s.Provider == HttpContext.GetUser());
        if (service == null) return NotFound();

        _mapper.Map(update, service);
        await _db.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("requests")]
    public async Task<ActionResult<List<RealtyServiceRequestDTO>>> GetReqeusts()
    {
        return await _mapper.ProjectTo<RealtyServiceRequestDTO>(_db.RealtyServiceRequests.Where(r => r.RealtyService.Provider == HttpContext.GetUser())).ToListAsync();
    }

    [HttpPost("requests/{id}/accept")]
    public async Task<ActionResult> AcceptServiceReqeust(int id)
    {
        var request = await _db.RealtyServiceRequests.Include(r => r.Realty).Include(r => r.RealtyService).FirstOrDefaultAsync(s => s.Id == id && s.RealtyService.Provider == HttpContext.GetUser());
        if (request == null) return NotFound();

        var newOrder = new RealtyServiceOrder()
        {
            Cost = request.RealtyService.Cost,
            Realty = request.Realty,
            RealtyService = request.RealtyService,
            Date = DateTime.Today,
            CompanyOrdered = request.CompanyOrdered,
            Orderer = request.Orderer
        };

        _db.RealtyServiceOrders.Add(newOrder);
        _db.RealtyServiceRequests.Remove(request);

        await _db.SaveChangesAsync();

        return Ok();
    }
}