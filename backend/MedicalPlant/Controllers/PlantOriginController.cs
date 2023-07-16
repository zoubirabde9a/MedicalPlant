using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantOriginController : Controller
{
    DataContext Context;

    public PlantOriginController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantOrigin>> Add(string latinName)
    {
        var newPlant = Context.PlantOriginData.Add(new PlantOrigin { LatinName = latinName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newPlant).Value);
    }
    
    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<PlantOrigin>> Update(long id, string latinName)
    {
        var plantOrigin = Context.PlantOriginData.Find(id);
        if (plantOrigin == null)
        {
            return new JsonResult(new { error = "Cannot be found!" }); 
        }

        plantOrigin.LatinName = latinName;
        await Context.SaveChangesAsync();
        return Ok(Json(plantOrigin).Value);
    }
    
    [HttpPost]
    [Route("Remove")]
    public async Task<ActionResult<PlantOrigin>> Remove(long id)
    {
        var plant = Context.PlantOriginData.Find(id);
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
    public async Task<ActionResult<PlantOrigin>> Get(int plantOriginId)
    {
        var newObject = Context.PlantOriginData.Where(origin => origin.PlantOriginId == plantOriginId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantOrigin element = list[0];

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
    public async Task<ActionResult<List<PlantOrigin>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantOriginData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantOriginData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantOriginData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}