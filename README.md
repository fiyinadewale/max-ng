# max-ng
## Documentation of Max.ng

## Author 🚀

> ADEWALE MOFIYINFOLUWA
---
## Technologies

- Node JS
- Express


---

## Database

- [Postgres](https://www.postgresql.org/) (TypeORM)

---

## Install NodeJS

To Install NodeJS, kindly go to [Nodejs](https://nodejs.com) and follow the necessary instructions required depending on
your PC Operating System

## MACOS

using a [package](https://nodejs.org/en/#download) simply download the installer

using [homebrew](https://github.com/Homebrew/legacy-homebrew)

```markdown
brew install node
```

---

## Windows

using a [package](https://nodejs.org/en/#download) simply download the installer


---

## To install Postgres

For Windows users, you can kindly follow this
tutorials [here](https://learnsql.com/blog/how-to-install-postgresql-on-windows-in-5-minutes/) to install Postgres on
your local PC which explains how to create a database

For Mac users, you can kindly follow this tutorials [here](https://www.robinwieruch.de/postgres-sql-macos-setup)  to
install Postgres on your local PC which explains how to create a database


---

## Start Development

Kindly clone the repo `https://github.com/fiyinadewale/max-ng.git`



## Implementation Required

BASE URL
> https://fiyin-max-ng.herokuapp.com/

### 1.List All Movies -> GET
> /movies
Example: <a href='https://fiyin-max-ng.herokuapp.com/movies'>https://fiyin-max-ng.herokuapp.com/movies</a>
<ul>
  <li><b>id</b>: This displays the id of the movie</li> 
  <li><b>title</b>: This displays the title of the movie</li> 
  <li><b>opening_crawl</b>: This displays the opening crawl of the movie</li> 
  <li><b>number_of_comments</b>: This displays the no of anonymous comments of the movie</li> 
</ul>

### 2. Add Anonymous Comment to movie-> GET
> /comment?id=4&comment=Nice Movie
Example: <a href='https://fiyin-max-ng.herokuapp.com/movies/comment?id=4&comment=Nice Movie'>https://fiyin-max-ng.herokuapp.com/movies/comment?id=4&comment=Nice Movie</a> 

Params
<ul>
  <li><b>id</b>: This is the id of the movie associated with the comment from anonymous</li>
  <li><b>comment</b>: This is the comment from anonymous</li>
</ul>

### 3. List All Comment associated to a Particular Movie in Reverse Chronological Order

> /comments/:id
Example: <a href="https://fiyin-max-ng.herokuapp.com/movies/comments/4">https://fiyin-max-ng.herokuapp.com/movies/comments/4</a>
Params
<ul>
<li><b>id</b>: This is the id of the movie</li>
</ul>
Response
<ul>
  <li><b>id</b>: This displays the id of the comment</li> 
  <li><b>episode__id</b>: This displays the id of the movie associated with the comment</li> 
  <li><b>body</b>: This displays the comment by the anonymous</li> 
  <li><b>ip_address</b>: This displays the ip address of the anonymous</li> 
  <li><b>comment_time</b>: This displays the date and time when the comment was made by the anonymous in UTC</li>
</ul> 

### 4. List All Comments in Reverse Chronological Order -> GET
> /comments
Example: <a href="https://fiyin-max-ng.herokuapp.com/movies/comments">https://fiyin-max-ng.herokuapp.com/movies/comments</a>
<ul>
  <li><b>id</b>: This displays the id of the comment</li> 
  <li><b>episode__id</b>: This displays the id of the movie associated with the comment</li> 
  <li><b>body</b>: This displays the comment by the anonymous</li> 
  <li><b>ip_address</b>: This displays the ip address of the anonymous</li> 
  <li><b>comment_time</b>: This displays the date and time when the comment was made by the anonymous in UTC</li>
</ul>


### 5. Filter and Sort for Character Lists per Movie

> /character?id=1&gender=male&sort=name&order=asc
Example: <a href="https://fiyin-max-ng.herokuapp.com/movies/character?id=1&gender=male&sort=name&order=asc">https://fiyin-max-ng.herokuapp.com/movies/character?id=1&gender=male&sort=name&order=asc</a>

Params
<ul>
<li><b>id</b>: This is the id of the movie</li>
<li><b>gender</b>: This is the gender to be filtered with. Default is all</li>
<li><b>sort</b>: The sort parameter takes two options(name and height). Default is name</li>
<li><b>order</b>: The order parameter takes two options(asc and desc). Default is asc. Asc - Ascending, desc - Descending</li>
</ul>

Response

<ul>
  <li><b>num_of_characters"</b>: This displays the number of characters that matched input criteria</li>
  <li><b>total_height</b></li>
    <ul>
    <li><b>ft_in</b>: The value of the total height in feet and inches</li>
    </ul>
data
<li><b>name</b>: This is the name of the character<li>
<li><b>gender</b>: This is the gender of the character<li>
<li><b>height</b>: This is the height of the character<li>
</ul>
    
