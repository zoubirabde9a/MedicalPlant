using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantPartController : Controller
{
    DataContext Context;

    public PlantPartController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantPart>> Add(string latinName)
    {
        var newElement = Context.PlantPartData.Add(new PlantPart { LatinName = latinName }).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }

    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<PlantPart>> Update(long id, string latinName)
    {
        var plantPart = Context.PlantPartData.Find(id);
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
    public async Task<ActionResult<PlantPart>> Remove(long id)
    {
        var plant = Context.PlantPartData.Find(id);
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
    public async Task<ActionResult<PlantPart>> Get(int plantPartId)
    {
        var newObject = Context.PlantPartData.Where(origin => origin.PlantPartId == plantPartId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantPart element = list[0];

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
    public async Task<ActionResult<List<PlantPart>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantPartData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantPartData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantPartData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}