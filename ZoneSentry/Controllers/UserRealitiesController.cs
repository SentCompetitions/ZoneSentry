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
public class UserRealitiesController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserRealitiesController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<RealtyDTO>>> GetRealities()
    {
        var rented = _db.Realties.Where(r => r.RentAgreements.FirstOrDefault(a => a.Date > DateTime.Now && a.ExpirationDate < DateTime.Now).Tenant == HttpContext.GetUser());
        var owned = _db.Realties.Where(r => r.Owner == HttpContext.GetUser());

        return _mapper.Map<List<RealtyDTO>>(await owned.Concat(rented).ToListAsync());
    } 
}