$(function(){
  // var element = "[class*=col]";
  var element = ".dragdrop";
  var handle = ".card-header";
  var connect = ".dragdrop";
  $(element).sortable({
    handle: handle,
    connectWith: connect,
    tolerance: 'pointer',
    forcePlaceholderSize: true,
    opacity: 0.8,
    placeholder: 'card-placeholder'
  })
  .disableSelection();
});
