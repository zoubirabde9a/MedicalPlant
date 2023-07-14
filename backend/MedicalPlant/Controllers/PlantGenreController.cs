using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantGenreController : Controller
{
    DataContext Context;

    public PlantGenreController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantGenre>> Add(string latinName)
    {
        var newElement = Context.PlantGenreData.Add(new PlantGenre { LatinName = latinName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }

    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<PlantGenre>> Get(int PlantGenreId)
    {
        var newObject = Context.PlantGenreData.Where(origin => origin.PlantGenreId == PlantGenreId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantGenre element = list[0];

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
    public async Task<ActionResult<List<PlantGenre>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantGenreData.Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantGenreData.Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantGenreData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}