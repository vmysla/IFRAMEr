  /// @example http://jsfiddle.net/vmysla/7rhgoeuq/
  (function initWidgets( tasks ){
    
    var scripts = document.getElementsByTagName( 'script' );

    for( var i=0; i<scripts.length; i++){
        
        var script = scripts[i];

        if( script.type == 'widget/html' ) {

          var parent  = script.parentNode || document;
          var next    = script.nextElementSibling || script.nextSibling;

          var iframe  = document.createElement( 'iframe' );
          var iscript = (next.type == 'widget/javascript') ? ('<script>' + next.innerHTML + '<'+'/script>') : '';
          var ihtml   = script.innerHTML.replace(/(<script.*)(\/>)/ig,'$1><'+'/script>');       

          iframe.width  = 0;  
          iframe.height = 0;
          iframe.className  = 'widget';
          iframe.id  = script.id || ('widget-' + Math.random() );

          parent.insertBefore( iframe, script );
          parent.removeChild( script );
          if(iscript) parent.removeChild( next );

          var iwindow, idocument, accessible;

          function access(iframe){
            iwindow = iframe.contentWindow;
            idocument = iframe.contentDocument || (iwindow && iwindow.document);
            return (accessible = iwindow && idocument);
          };

          iframe.init = function(iframe){
                
              access(iframe);

             // idocument.write( ihtml );
             // idocument.write('<style> body{ overflow : hidden; } </style>');
             idocument.write( ihtml + iscript + '<style> body{ overflow : hidden; } </style>' );
             idocument.close();
              
              for( var taskName in tasks ){  
                  try {
                      tasks[taskName]( iframe, iwindow, idocument );
                  } catch( error ) {
                      if( window.console && console.log ) {
                          console.log( 'IFRAMEr task exception', taskName, script.name, error.message );
                      }
                  }
              }

              
              //idocument.write( iscript );
              
              //idocument.body.className = 'ready';
              //idocument.contentDocument = idocument;
              //idocument.contentWindow = iwindow;
              //idocument.contentDocument = idocument;
          };

          if(access(iframe) == false) {
              iframe.src = 'javascript:(document.open().domain="'+document.domain+'") && frameElement.init(frameElement)';
          } else {
              iframe.init(iframe);
          }
          
        }
    }

  })({

    adjustForContainer : function adjustForContainerTask(iframe, iwindow, idocument){
      //idocument.write('<style> body{ overflow : hidden; } </style>');
      iframe.style['height']     = '100%';
      iframe.style['width']      = '100%';
	  iframe.tabIndex = 0;
      iframe.frameborder = 0;
      iframe.marginHeight = 0;
      iframe.marginWidth = 0;
      iframe.scrolling = 'no';
      iframe.style['border'] = 'none';
      iframe.style['overflow'] = 'hidden';
      iframe.setAttribute('hspace', 0);
      iframe.setAttribute('vspace', 0);
      iframe.setAttribute('allowtransparency', 'false');
      iframe.setAttribute('aria-hidden', 'true');      
    },
    
    shareGoogleAnalytics : function shareGoogleAnalyticsTask(iframe, iwindow, idocument){
    
      var gaDefaultName = 'ga';
 
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
