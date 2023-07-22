using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantEffectController : Controller
{
    DataContext Context;

    public PlantEffectController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantEffect>> Add(string latinName)
    {
        var newElement = Context.PlantEffectData.Add(new PlantEffect { LatinName = latinName }).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }

    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<PlantEffect>> Update(long id, string latinName)
    {
        var plantPart = Context.PlantEffectData.Find(id);
        if (plantPart == null)
        {
            return new JsonResult(new { error = "Cannot be found!" }); 
        }

        plantPart.LatinName = latinName;
        await Context.SaveChangesAsync();
        return Ok(Json(plantPart).Value);
    }
    
    [HttpPost]
    [Route("Remove")]
    public async Task<ActionResult<PlantEffect>> Remove(long id)
    {
        var plant = Context.PlantEffectData.Find(id);
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
    public async Task<ActionResult<PlantEffect>> Get(int id)
    {
        var newObject = Context.PlantEffectData.Where(origin => origin.PlantEffectId == id);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantEffect element = list[0];

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
    public async Task<ActionResult<List<PlantEffect>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantEffectData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantEffectData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantEffectData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}