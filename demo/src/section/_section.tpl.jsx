<section id={config.name}>
  <h1>
    {config.title}&nbsp;
    <small>({config.id})</small>
  </h1>
  <div class="row">
    <div class="col-md-6 demo">
      {ctrl.demo.$view()}
    </div>
    <div class="col-md-6 doc">
      {config.doc}
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 code">
      {ctrl.tabs1.$view()}
    </div>
    <div class="col-md-6 code">
      {ctrl.tabs2.$view()}
    </div>
  </div>
</section>
