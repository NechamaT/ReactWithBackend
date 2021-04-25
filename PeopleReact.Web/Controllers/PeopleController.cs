using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PeopleReact.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("GetAll")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("Add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
        }

        
        [Route("Update")]
        public void Update(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Edit(person);
        }

        [HttpPost]
        [Route("Delete")]
        public void Delete(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(person);
        }
    }
}
