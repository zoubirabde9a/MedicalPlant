using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantClassController : Controller
{
    DataContext Context;

    public PlantClassController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantClass>> Add(string latinName)
    {
        var newElement = Context.PlantClassData.Add(new PlantClass { LatinName = latinName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }
    
    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<PlantClass>> Update(long id, string latinName)
    {
        var plantClass = Context.PlantClassData.Find(id);
        if (plantClass == null)
        {
            return new JsonResult(new { error = "Cannot be found!" }); 
        }

        plantClass.LatinName = latinName;
        await Context.SaveChangesAsync();
        return Ok(Json(plantClass).Value);
    }
    
    [HttpPost]
    [Route("Remove")]
    public async Task<ActionResult<PlantClass>> Remove(long id)
    {
        var plant = Context.PlantClassData.Find(id);
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
    public async Task<ActionResult<PlantClass>> Get(int plantClassId)
    {
        var newObject = Context.PlantClassData.Where(origin => origin.PlantClassId == plantClassId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantClass element = list[0];

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
    public async Task<ActionResult<List<PlantClass>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantClassData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantClassData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantClassData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}