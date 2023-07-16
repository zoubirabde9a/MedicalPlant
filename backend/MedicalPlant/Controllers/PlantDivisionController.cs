using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantDivisionController : Controller
{
    DataContext Context;

    public PlantDivisionController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantDivision>> Add(string latinName)
    {
        var newElement = Context.PlantDivisionData.Add(new PlantDivision { LatinName = latinName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }
    
    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<PlantDivision>> Update(long id, string latinName)
    {
        var obj = Context.PlantDivisionData.Find(id);
        if (obj == null)
        {
            return new JsonResult(new { error = "Cannot be found!" }); 
        }

        obj.LatinName = latinName;
        await Context.SaveChangesAsync();
        return Ok(Json(obj).Value);
    }
    
    [HttpPost]
    [Route("Remove")]
    public async Task<ActionResult<PlantDivision>> Remove(long id)
    {
        var plant = Context.PlantDivisionData.Find(id);
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
    public async Task<ActionResult<PlantDivision>> Get(int plantDivisionId)
    {
        var newObject = Context.PlantDivisionData.Where(origin => origin.PlantDivisionId == plantDivisionId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantDivision element = list[0];

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
    public async Task<ActionResult<List<PlantDivision>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantDivisionData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantDivisionData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantDivisionData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}