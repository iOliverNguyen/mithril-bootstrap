<div>
  <h3>Static</h3>
  <div class="row">
    <div class="col-sm-4">
      <div class="progress " value="55">
        <div class="progress-bar" style="width: 55%;"></div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="progress-striped progress " value="22" type="warning">
        <div class="progress-bar progress-bar-warning" style="width: 22%;">
          <span>22%</span>
        </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="progress-striped active progress " max="200" value="166" type="danger">
        <div class="progress-bar progress-bar-danger" style="width: 166%">
          <i>166 / 200</i>
        </div>
      </div>
    </div>
  </div>

  <hr/>
  <h3>Dynamic
    <button class="btn btn-sm btn-primary" onclick={ctrl.random}>
      Randomize</button>
  </h3>
  <div class="progress" max="max" value="dynamic">
    <div class="progress-bar" style="width: 9.5%;">
      <span style="color:black; white-space:nowrap;">
        {ctrl.dynamic()} / {ctrl.max()}
      </span>
    </div>
  </div>

  <small><em>No animation</em></small>
  <div class="progress" animate="false" value="dynamic" type="success">
    <div class="progress-bar progress-bar-success"
      style="transition: none; -webkit-transition: none; width: 19%;">
      <b>19%</b>
    </div>
  </div>

  <small><em>Object (changes type based on value)</em></small>
  <div class="progress-striped active progress " value="dynamic" type="success">
    <div class="progress-bar progress-bar-success" style="width: 19%;">
      <span>success</span>
      <i>!!! Watch out !!!</i>
    </div>
  </div>

  <hr/>
  <h3>Stacked
    <button class="btn btn-sm btn-primary">
      Randomize</button>
  </h3>
  <div class="progress">
    <div class="progress-bar progress-bar-danger" value="bar.value" type="danger"
      style="width: 25%;">
      <span>25%</span>
    </div>
    <div class="progress-bar  progress-bar-success" value="bar.value" type="success"
      style="width: 29%;">
      <span>29%</span>
    </div>
  </div>
</div>
