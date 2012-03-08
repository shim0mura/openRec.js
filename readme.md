# usage

    <ul id="category">
      <li>class1
        <ul>
          <li>class2
            <ul>
              <li>class3</li>
              <li>class3</li>
            </ul>
            <ul>
              <li class="open">class3</li>
              <li class="open">class3</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>class2
            <ul>
              <li>class3</li>
              <li>class3</li>
            </ul>
            <ul>
              <li>class3</li>
              <li>class3</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>


    var container = document.getElementById("category");
    new OpenRec(container);

