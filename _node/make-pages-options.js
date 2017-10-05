
'use strict';

exports.BASE_URL = 'http://sms-ausd-ca.schoolloop.com';

exports.HEAD_ELEMENT_HTML = `
<!--
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
-->

<meta name="robots" content="noindex" />

<!--
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i|Roboto+Slab:100,300,400,700" />
<link rel="stylesheet" href="/css/shared.css" />
-->

<link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i|Source+Sans+Pro:400,400i,700,700i" rel="stylesheet" />
<link rel="stylesheet" href="/custom-code/custom-header.css" />
<link rel="stylesheet" href="/custom-code/custom-header-override.css">

<script src="/custom-code/custom-header.js"></script>
`;

/*
exports.LOGO_HTML = `
<a href="/">
  <img src="/images/slauson.png" width="150" alt="" />
  <h2>Slauson Middle School</h2>
  <p>Home of the Panthers</p>
</a>
`;
*/

exports.LOGO_HTML = `
<h1>Slauson Middle School</h1>
`;

exports.FOOTER_HTML = `
<div class="contact">
  <div>
    <h2>Slauson Middle School</h2>
    <p>340 West Fifth Street<br />Azusa, CA 91702</p>
    <p>626-815-7300</p>
  </div>

  <p><strong>Yvette Walker, Principal</strong><br /><a href="mailto:ywalker@azusa.org">ywalker@azusa.org</a></p>
  <p><strong>Carol Fieri, Assistant Principal</strong><br /><a href="mailto:cfieri@azusa.org">cfieri@azusa.org</a></p>
  <p><strong>Dominique Perez, Academic Counselor</strong><br /><a href="mailto:dperez @azusa.org">dperez @azusa.org</a></p>
  <p><strong>Lori Shore, Academic Counselor</strong><br /><a href="mailto:lshore@azusa.org">lshore@azusa.org</a></p>
  <p><strong>Peggy Barbosa, School Secretary</strong><br /><a href="mailto:pbarbosa@azusa.org">pbarbosa@azusa.org</a></p>
</div>

<div class="legal">
  <h2><a href="http://azusa.org"><img src="/images/azusa-district.png" width="100" height="100" alt="Azusa Unified School District" /></a></h2>
  <p>The District prohibits, at any district school or school activity, unlawful discrimination, harassment, intimidation, and bullying of any student based on the student’s actual race, color, ancestry, national origin, ethnic group, identication, age, religion, marital or parental status, physical or mental disability, sex, sexual orientation, gender, gender identity, or gender expression; the perception of one or more of such characteristics; or association with a person or group with one or more these actual or perceived characteristics.</p>
</div>
`;

exports.SITE_MAP_URL = 'http://sms-ausd-ca.schoolloop.com/portal/site_map?d=x';

exports.SECTIONS_DATA = [{
  title: 'Main Pages',
  pages: [
    {
      url: '/',
      title: 'Home'
    }
  ]
}];
