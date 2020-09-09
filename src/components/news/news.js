import React,{Component} from 'react';
import './news.css'

class News extends Component{

    state = {
        persons: []
      }
    
      componentDidMount() {
      
      
      }
render(){
    return(
<div id='textdiv'>

<ul>
        {/* { this.state.persons.map(person => <li>{person.name}</li>)} */}
      </ul>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum mattis massa vel auctor. Proin varius mauris nisi, ac sagittis ante feugiat et. Quisque pellentesque fermentum ullamcorper. Cras eget laoreet arcu. Fusce in interdum leo, bibendum vestibulum ante. Integer sed orci quis diam accumsan porta vel a massa. Integer sit amet nulla vel nisl pharetra maximus sit amet eu orci. Morbi fringilla urna sit amet iaculis posuere. Donec vestibulum eros id arcu convallis venenatis. Sed malesuada semper mollis. Vestibulum rhoncus eleifend purus, in eleifend nibh consequat aliquet. Integer fermentum turpis vel mi vulputate tristique. Proin sit amet dictum est. Duis ipsum tortor, pharetra sit amet pellentesque vitae, eleifend sed augue. In ac metus dignissim, viverra eros vel, dictum purus.


Sed gravida erat sit amet fermentum commodo. Vivamus a dui ut felis aliquam laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque luctus nulla non nisl cursus, sed ultrices nisl consectetur. Phasellus venenatis ut mi non gravida. Nam ullamcorper blandit varius. Pellentesque dolor nisi, pharetra in pellentesque et, consequat vel nulla. Donec vel faucibus lacus. Quisque tempor nulla ut sollicitudin pellentesque. Nam dignissim, velit quis dictum pellentesque, erat lectus gravida nibh, in commodo libero mauris at ligula. Vivamus eget bibendum metus. Maecenas accumsan neque quis ante ornare, vitae dictum tellus blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur dictum eu metus non vulputate. Quisque et sem ut mauris rhoncus faucibus. Donec pulvinar felis sit amet nibh suscipit tincidunt.

</div>
    )
}
}
export default News;