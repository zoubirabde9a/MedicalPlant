using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantSpeciesController : Controller
{
    DataContext Context;

    public PlantSpeciesController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantSpecies>> Add(string latinName)
    {
        var newElement = Context.PlantSpeciesData.Add(new PlantSpecies { LatinName = latinName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }

    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<PlantSpecies>> Get(int PlantSpeciesId)
    {
        var newObject = Context.PlantSpeciesData.Where(origin => origin.PlantSpeciesId == PlantSpeciesId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantSpecies element = list[0];

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
    public async Task<ActionResult<List<PlantSpecies>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantSpeciesData.Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantSpeciesData.Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantSpeciesData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}