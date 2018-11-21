/* Creates a Table with the following columns and rules
 *  Username - Maximum 40 Characters
 * Password - Maximum 40 Characters
 * First Name - Maximum 20 Characters
 * Last Name - Maximum 20 Characters
 * Comment List Tag - Maximum 255 Characters
 */
USE studyspace; # Select Database
CREATE TABLE users_table (username VARCHAR(40), password VARCHAR(40), first_name VARCHAR(20), last_name VARCHAR (20), comment_list_tag VARCHAR(255)); 
