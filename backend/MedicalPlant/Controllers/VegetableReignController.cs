using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class VegetableReignController : Controller
{
    DataContext Context;

    public VegetableReignController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<VegetableReign>> Add(string latinName)
    {
        var newElement = Context.VegetableReignData.Add(new VegetableReign { LatinName = latinName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }

    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<VegetableReign>> Get(int vegetableReignId)
    {
        var newObject = Context.VegetableReignData.Where(origin => origin.VegetableReignId == vegetableReignId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            VegetableReign element = list[0];

            return Ok(Json(element).Value);
        }
        else
        {

            HttpContext.Response.StatusCode = 500; 
            return new JsonResult(new { error = "Cannot be found!" });         
        }

    }
    
    [HttpGet]
    [Route("GetAll")]
    public async Task<ActionResult<List<VegetableReign>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.VegetableReignData.Skip(offset).Take(limit).ToListAsync());
    }
}