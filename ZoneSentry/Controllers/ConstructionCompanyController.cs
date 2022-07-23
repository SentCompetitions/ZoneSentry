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

    private async Task<ResidentialComplex> GetComplexObject(int id)
    {
        return await _db.ResidentialComplexes
            .Include(c => c.Houses)
            .FirstAsync(c => c.Id == id && c.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
    }
    
    [HttpGet("complexes/{id}")]
    public async Task<ActionResult<ResidentialComplexDTO>> GetComplex(int id)
    {
        return _mapper.Map<ResidentialComplexDTO>(await GetComplexObject(id));
    }
    
    [HttpDelete("complexes/{id}")]
    public async Task<ActionResult> DeleteComplex(int id)
    {
        var complex = await GetComplexObject(id);
        if (complex != null)
        {
            _db.ResidentialComplexes.Remove(complex);
            await _db.SaveChangesAsync();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }
    
    [HttpPost("complexes")]
    public async Task<ActionResult<ResidentialComplexDTO>> CreateComplex(ResidentialComplexCreate create)
    {
        var complex = _mapper.Map<ResidentialComplex>(create);
        complex.ConstructionCompany = await _db.ConstructionCompanies.FirstAsync(c => c.Employees.Contains(HttpContext.GetUser()));
        _db.ResidentialComplexes.Add(complex);
        await _db.SaveChangesAsync();

        return _mapper.Map<ResidentialComplexDTO>(complex);
    } 

    private async Task<House> GetHouseObject(int id)
    {
        return await _db.Houses
            .Include(c => c.Realties)
            .FirstAsync(c =>
                c.Id == id && c.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
    }
    
    [HttpGet("houses/{id}")]
    public async Task<ActionResult<HouseDTO>> GetHouse(int id)
    {
        return _mapper.Map<HouseDTO>(await GetHouseObject(id));
    }
    
    [HttpDelete("houses/{id}")]
    public async Task<ActionResult> DeleteHouse(int id)
    {
        var house = await GetHouseObject(id);
        if (house != null)
        {
            _db.Houses.Remove(house);
            await _db.SaveChangesAsync();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }
    
    [HttpPost("complexes/{id}/houses")]
    public async Task<ActionResult<HouseDTO>> CreateHouse(int id, HouseCreate create)
    {
        var complex = await GetComplexObject(id);
        if (complex == null) return BadRequest();
        
        var house = _mapper.Map<House>(create);
        house.ResidentialComplex = complex;
        _db.Houses.Add(house);
        await _db.SaveChangesAsync();

        return _mapper.Map<HouseDTO>(house);
    } 

    private async Task<Realty> GetRealtyObject(int id)
    {
        return await _db.Realties
            .Include(c => c.RentAgreements)
            .FirstAsync(c =>
                c.Id == id && c.House.ResidentialComplex.ConstructionCompany.Employees.Contains(HttpContext.GetUser()));
    }
    
    [HttpGet("realties/{id}")]
    public async Task<ActionResult<RealtyDTO>> GetRealty(int id)
    {
        return _mapper.Map<RealtyDTO>(await GetRealtyObject(id));
    }
    
    [HttpPut("realties/{id}")]
    public async Task<ActionResult> UpdateRealty(int id, RealtyUpdate update)
    {
        var realty = await GetRealtyObject(id);
        if (realty == null) return NotFound();

        _mapper.Map(update, realty);
        await _db.SaveChangesAsync(); 
        
        return Ok();
    }
    
    [HttpGet("realties/{id}/details")]
    public async Task<ActionResult<RealtyDetails>> GetRealtyDetails(int id)
    {
        return _mapper.Map<RealtyDetails>(await GetRealtyObject(id));
    }
    
    [HttpDelete("realties/{id}")]
    public async Task<ActionResult> DeleteRealty(int id)
    {
        var realty = await GetRealtyObject(id);
        if (realty != null)
        {
            _db.Realties.Remove(realty);
            await _db.SaveChangesAsync();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }
    
        
    [HttpPost("houses/{id}/realties")]
    public async Task<ActionResult<RealtyDTO>> CreateRealty(int id, RealtyCreate create)
    {
        var house = await GetHouseObject(id);
        if (house == null) return BadRequest();
        
        var realty = _mapper.Map<Realty>(create);
        realty.House = house;
        realty.OwnedByCompany = true;
        _db.Realties.Add(realty);
        await _db.SaveChangesAsync();
        
        _db.Entry(realty).Collection(b => b.RentAgreements).Load();

        return _mapper.Map<RealtyDTO>(realty);
    } 
}