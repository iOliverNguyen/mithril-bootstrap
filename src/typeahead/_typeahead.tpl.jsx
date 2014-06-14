<div style={{position: 'relative'}}>
    <input type="text" class="form-control" oninput={m.withAttr("value", ctrl.change)}
    value={ctrl.text()} onkeydown={onkeydown}/>
    {dropdown}
</div>
