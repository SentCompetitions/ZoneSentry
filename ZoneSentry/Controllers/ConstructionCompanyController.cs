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
public class ConstructionCompanyController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public ConstructionCompanyController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<ActionResult<ConstructionCompanyDTO>> GetCompany()
    {
        return _mapper.Map<ConstructionCompanyDTO>(await _db.ConstructionCompanies
            .Include(c => c.ResidentialComplexes)
            .FirstAsync(c => c.Employees.Contains(HttpContext.GetUser())));
    }
    
    [HttpGet("complexes/{id}")]
    public async Task<ActionResult<ResidentialComplexDTO>> GetComplex(int id)
    {
        return _mapper.Map<ResidentialComplexDTO>(await _db.ResidentialComplexes
            .Include(c => c.Houses)
            .FirstAsync(c => c.Id == id && c.ConstructionCompany.Employees.Contains(HttpContext.GetUser())));
    }
    
    [HttpGet("houses/{id}")]
    public async Task<ActionResult<HouseDTO>> GetHouse(int id)
    {
        return _mapper.Map<HouseDTO>(await _db.Houses
            .Include(c => c.Realties)
            .FirstAsync(c => c.Id == id && c.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser())));
    }
    
    [HttpGet("realities/{id}")]
    public async Task<ActionResult<RealtyDTO>> GetRealty(int id)
    {
        return _mapper.Map<RealtyDTO>(await _db.Realties
            .Include(c => c.RentAgreements)
            .FirstAsync(c => c.Id == id && c.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser())));
    }
}