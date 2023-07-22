using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
namespace Controllers;


[Route("api/[controller]")]
public class PlantContraindicationController : Controller
{
    DataContext Context;

    public PlantContraindicationController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<PlantContraindication>> Add(string latinName)
    {
        var newElement = Context.PlantContraindicationData.Add(new PlantContraindication { LatinName = latinName }).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newElement).Value);
    }

    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<PlantContraindication>> Update(long id, string latinName)
    {
        var plantPart = Context.PlantContraindicationData.Find(id);
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
    public async Task<ActionResult<PlantContraindication>> Remove(long id)
    {
        var plant = Context.PlantContraindicationData.Find(id);
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
    public async Task<ActionResult<PlantContraindication>> Get(int id)
    {
        var newObject = Context.PlantContraindicationData.Where(origin => origin.PlantContraindicationId == id);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            PlantContraindication element = list[0];

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
    public async Task<ActionResult<List<PlantContraindication>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantContraindicationData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<PlantDivision>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantContraindicationData.Where(division => !division.Removed).Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantContraindicationData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}