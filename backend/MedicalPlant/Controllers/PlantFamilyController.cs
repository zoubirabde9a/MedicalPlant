using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantFamilyController : Controller
{
    DataContext Context;

    public PlantFamilyController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantFamily>> Add(string latinName)
    {
        var newElement = Context.PlantFamilyData.Add(new PlantFamily { LatinName = latinName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }
    
    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<PlantFamily>> Update(long id, string latinName)
    {
        var plantFamily = Context.PlantFamilyData.Find(id);
        if (plantFamily == null)
        {
            return new JsonResult(new { error = "Cannot be found!" }); 
        }

        plantFamily.LatinName = latinName;
        await Context.SaveChangesAsync();
        return Ok(Json(plantFamily).Value);
    }
    
    [HttpPost]
    [Route("Remove")]
    public async Task<ActionResult<PlantFamily>> Remove(long id)
    {
        var plant = Context.PlantFamilyData.Find(id);
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
    public async Task<ActionResult<PlantFamily>> Get(int plantFamilyId)
    {
        var newObject = Context.PlantFamilyData.Where(origin => origin.PlantFamilyId == plantFamilyId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantFamily element = list[0];

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
    public async Task<ActionResult<List<PlantFamily>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantFamilyData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantFamilyData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantFamilyData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}