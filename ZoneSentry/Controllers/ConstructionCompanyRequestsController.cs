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
}