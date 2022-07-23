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
public class UserServicesPaymentController: ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;

    public UserServicesPaymentController(ApplicationDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [HttpGet("payments")]
    public async Task<ActionResult<List<RealtyServicePaymentDTO>>> GetPayments(int? realtyId)
    {
        var payments = _db.RealtyServicePayments.Where(p => p.Orderer == HttpContext.GetUser());

        if (realtyId != null) payments = payments.Where(p => p.RealtyServiceOrder != null && p.RealtyServiceOrder.Realty.Id == realtyId);
        
        return await _mapper.ProjectTo<RealtyServicePaymentDTO>(payments.OrderBy(p => p.PaymentState)).ToListAsync();
    }
    
    [HttpPost("payments/{paymentId}/pay")]
    public async Task<ActionResult> PayForService(int paymentId)
    {
        var payment = await _db.RealtyServicePayments.FirstOrDefaultAsync(r => r.Id == paymentId && r.Orderer == HttpContext.GetUser());
        if (payment == null) return NotFound();
        
        // Здесь долна быть проверка на то что деньги действительно пришли и тд, но мы на хакатоне
        payment.PaymentState = PaymentState.Paid;
        payment.PaymentDate = DateTime.Today;
        await _db.SaveChangesAsync();
        
        return Ok();
    }
}