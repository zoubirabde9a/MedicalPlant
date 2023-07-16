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
    
    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<VegetableReign>> Update(long id, string latinName)
    {
        var vegetableReign = Context.VegetableReignData.Find(id);
        if (vegetableReign == null)
        {
            return new JsonResult(new { error = "Cannot be found!" }); 
        }

        vegetableReign.LatinName = latinName;
        await Context.SaveChangesAsync();
        return Ok(Json(vegetableReign).Value);
    }
    
    [HttpPost]
    [Route("Remove")]
    public async Task<ActionResult<VegetableReign>> Remove(long id)
    {
        var plant = Context.VegetableReignData.Find(id);
        if (plant != null)
        {
            plant.Removed = true;
            await Context.SaveChangesAsync();
            return Ok(Json(plant).Value);
        }
        
        return new JsonResult(new { error = "Cannot be found!" });   
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
        return Ok(await Context.VegetableReignData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.VegetableReignData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.VegetableReignData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}