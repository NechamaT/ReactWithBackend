using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PeopleReact.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddPerson(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.People.Add(person);
            ctx.SaveChanges();
        }

        public List<Person> GetAll()
        {
            using var ctx = new PeopleDbContext(_connectionString);
            return ctx.People.ToList();
        }

        public void Edit(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.People.Add(person);
            ctx.Entry(person).State = EntityState.Modified;
            ctx.SaveChanges();
        }

        public void Delete(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
        }
    }
}
