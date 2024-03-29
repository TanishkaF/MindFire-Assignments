﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoUserManagement.ViewModel
{
    public class UserDetailsViewModel
    {
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }    

        public string ConfirmPassword { get; set; }    

        public string DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string AadharNumber { get; set; }
        public string Hobbies { get; set; }
        public string DiskDocumentName { get; set; }
        public string OriginalDocumentName { get; set; }
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
    }
}
