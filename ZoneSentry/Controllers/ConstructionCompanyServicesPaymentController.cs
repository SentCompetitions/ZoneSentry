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
public class ConstructionCompanyServicesPaymentController: ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public ConstructionCompanyServicesPaymentController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet("payments")]
    public async Task<ActionResult<List<RealtyServicePaymentDTO>>> GetPayments(int? realtyId)
    {
        var company = await _db.ConstructionCompanies.FirstAsync(c => c.Employees.Contains(HttpContext.GetUser()));
        var payments = _db.RealtyServicePayments.Where(p => p.ConstructionCompany == company).OrderBy(p => p.PaymentState);

        return await _mapper.ProjectTo<RealtyServicePaymentDTO>(payments).ToListAsync();
    }
    
    [HttpPost("payments/{paymentId}/pay")]
    public async Task<ActionResult> PayForService(int paymentId)
    {
        var company = await _db.ConstructionCompanies.FirstAsync(c => c.Employees.Contains(HttpContext.GetUser()));
        var payment = await _db.RealtyServicePayments.FirstOrDefaultAsync(r => r.Id == paymentId && r.ConstructionCompany == company);
        if (payment == null) return NotFound();
        
        // Здесь долна быть проверка на то что деньги действительно пришли и тд, но мы на хакатоне
        payment.PaymentState = PaymentState.Paid;
        payment.PaymentDate = DateTime.Today;
        await _db.SaveChangesAsync();
        
        return Ok();
    }
}