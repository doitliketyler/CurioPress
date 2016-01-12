CurioPress
---------------
Hey there! CurioPress is a theme kit for Wordpress to help jump start any Wordpress project. This kit doesn't assume anything so don't fret over stripping anything out because you wont need to. It does come packed with a handful of useful tools that include:

* Underscores for base Wordpress template files.
* Bourbon for a lightweight Sass mixin library.
* Neat for a responsive Sass grid framework.
* Bitters for a default set of Sass variables.


Requirements
---------------
* Node.js
* Wordpress


Installation
---------------
1. Install Wordpress. I suggest using Scotch Box for your database.
2. Clone this repository inside of wp-content/themes/ folder.
3. In terminal cd into the theme folder you just cloned.
4. Type 'npm install' and wait for the node_modules to download.
5. Open gulpfile.js and update the proxy address under 'Browser-Sync'.
6. Next just type 'gulp' and voila, you're project is ready to go!


Useful Notes
---------------
1. Add any new styles to the src/sass/theme folder and 'import' them into the src/sass/style.css file.
2. To change the grid settings just update the src/sass/base/_grid-settings.scss file.
3. Add any new scripts to the src/js folder and 'require' them inside src/js/main.js file.
4. Add any new images inside of src/img and it will optimize theme into the root img folder.
5. If you are looking for some prebuilt components & patterns then consider using Refills.


Useful Links
---------------
* Wordpress: https://wordpress.org/
* Scotch Box: https://box.scotch.io/
* Underscores: http://underscores.me/
* Bourbon: http://bourbon.io/
* Neat: http://neat.bourbon.io/
* Bitters: http://bitters.bourbon.io/
* Refills: http://refills.bourbon.io/