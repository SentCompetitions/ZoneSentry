﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Controllers;

[Authorize("User")]
[Route("api/[controller]")]
[ApiController]
public class UserRealtiesRentedController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserRealtiesRentedController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<RealtyDTO>>> GetRentedRealties()
    {
        var owned = _db.Realties.Where(r => r.RentAgreements.FirstOrDefault(a => a.Date > DateTime.Now && a.ExpirationDate < DateTime.Now).Tenant == HttpContext.GetUser());

        return await _mapper.ProjectTo<RealtyDTO>(owned).ToListAsync();
    } 
}