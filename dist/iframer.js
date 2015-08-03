
  /// @example http://jsfiddle.net/vmysla/7rhgoeuq/
  (function initWidgets( tasks ){
    
    var scripts = document.getElementsByTagName( 'script' );

    for( var i=0; i<scripts.length; i++){
        
        var script = scripts[i];

        if( script.type == 'widget/html' ) {

          var parent  = script.parentNode || document;
          var next    = script.nextElementSibling || script.nextSibling;

          var iframe  = document.createElement( 'iframe' );
          var iscript = (next.type == 'widget/javascript') ? ('<script>' + next.innerHTML + '</'+'script>') : '';
          var ihtml   = script.innerHTML.replace(/(<script.*)(\/>)/ig,'$1></script>') + iscript;

          iframe.width  = '0';  
          iframe.height = '0';
          iframe.frameborder = '0';

          parent.insertBefore( iframe, script );
          parent.removeChild( script );
          if(iscript) parent.removeChild( next );

          var iwindow   = iframe.contentWindow;
          var idocument = iframe.contentDocument || iwindow.document;

          idocument.open();

          for( var taskName in tasks ){  
              try {
                  tasks[taskName]( iframe, iwindow, idocument );
              } catch( error ) {
                  if( window.console && console.log ) {
                      console.log( 'IFRAMEr task exception', taskName, script.name, error.message );
                  }
              }
          }
          
          idocument.write( ihtml );
          idocument.close();       
        }

    }

  })({

    adjustForContainer : function adjustForContainerTask(iframe, iwindow, idocument){
      iframe.style['background'] = 'transparent';
      iframe.style['border']     = 'none';
      iframe.style['height']     = '100%';
      iframe.style['width']      = '100%';
    },
    
    shareGoogleAnalytics : function shareGoogleAnalyticsTask(iframe, iwindow, idocument){
    
      var gaDefaultName = 'ga';
      var gaTrackerName = window['GoogleAnalyticsObject'] || gaDefaultName;
      var gaTracker = window[gaTrackerName];

      iwindow[gaDefaultName] = function(){
        var gaTrackerName = window['GoogleAnalyticsObject'] || gaDefaultName;
        var gaTracker = window[gaTrackerName];
        if(gaTracker) gaTracker.apply(window, arguments);
      }; 
      
    },

    shareContainer : function shareContainerTask(iframe, iwindow, idocument){
      iwindow['container'] = iframe;
    }

  });
