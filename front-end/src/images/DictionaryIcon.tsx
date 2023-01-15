import * as React from "react";
import { SVGProps } from "react";

const DictionaryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    className="icon"
    {...props}
  >
    <path
      fill="transparent"
      opacity={1}
      stroke="none"
      d=" M288.000000,513.000000  C192.023300,513.000000 96.546600,513.000000 1.034948,513.000000  C1.034948,342.398285 1.034948,171.796539 1.034948,1.097402  C171.560043,1.097402 342.120178,1.097402 512.840149,1.097402  C512.840149,171.666550 512.840149,342.333252 512.840149,513.000000  C438.129852,513.000000 363.314911,513.000000 288.000000,513.000000  M301.975250,72.476311  C289.832092,63.002522 276.460052,55.877895 261.901031,50.791630  C246.221680,45.313965 230.078659,44.748840 213.724045,44.923328  C200.261917,45.066952 187.162048,47.533504 174.821228,52.271084  C142.676575,64.611252 117.677238,85.513763 101.652252,116.491600  C100.835152,118.071114 98.698753,119.438049 96.901741,119.963013  C86.727310,122.935226 76.435265,125.503265 66.249611,128.439087  C57.618706,130.926788 51.804573,136.602737 49.508923,145.303162  C48.670780,148.479706 47.162457,149.295715 44.298244,149.024811  C42.976986,148.899826 41.617275,149.142349 40.303555,148.982925  C28.251225,147.520477 16.762703,160.632629 16.808821,172.125015  C17.163887,260.608734 17.180563,349.095276 16.793282,437.578735  C16.741671,449.370361 28.272638,461.313232 40.501331,461.212921  C99.320824,460.730042 158.146469,461.013397 216.969864,460.951294  C220.453415,460.947632 223.047760,461.917023 225.953110,464.088898  C229.227219,466.536438 233.614807,468.597992 237.609253,468.775452  C250.581421,469.351685 263.609406,469.326355 276.584412,468.782074  C280.440094,468.620300 284.756317,466.702179 287.831146,464.280579  C290.844238,461.907593 293.578796,460.942078 297.247437,460.946411  C356.237427,461.016266 415.227570,461.001709 474.217651,460.991028  C487.281403,460.988678 496.989014,451.340607 496.990417,438.346466  C497.000244,349.361420 497.000275,260.376343 496.965027,171.391312  C496.964233,169.429199 496.653778,167.435684 496.238068,165.510757  C494.410156,157.047043 483.721130,147.518173 472.954651,148.993851  C468.312744,149.630112 465.177338,148.975357 463.673004,143.210281  C461.835266,136.167770 456.428162,131.454468 449.398010,128.983551  C433.859558,123.522217 417.980591,119.746262 401.567535,117.783981  C382.501068,115.504478 363.540894,115.097267 344.534485,117.893570  C340.786926,118.444916 338.013092,117.907333 336.175476,113.742752  C334.187408,109.237137 331.257294,105.107010 328.448914,101.011383  C321.176483,90.405563 312.530945,81.036102 301.975250,72.476311  z"
    />
    <path
      fill="#343434"
      opacity={1}
      stroke="none"
      d=" M302.227783,72.731461  C312.530945,81.036102 321.176483,90.405563 328.448914,101.011383  C331.257294,105.107010 334.187408,109.237137 336.175476,113.742752  C338.013092,117.907333 340.786926,118.444916 344.534485,117.893570  C363.540894,115.097267 382.501068,115.504478 401.567535,117.783981  C417.980591,119.746262 433.859558,123.522217 449.398010,128.983551  C456.428162,131.454468 461.835266,136.167770 463.673004,143.210281  C465.177338,148.975357 468.312744,149.630112 472.954651,148.993851  C483.721130,147.518173 494.410156,157.047043 496.238068,165.510757  C496.653778,167.435684 496.964233,169.429199 496.965027,171.391312  C497.000275,260.376343 497.000244,349.361420 496.990417,438.346466  C496.989014,451.340607 487.281403,460.988678 474.217651,460.991028  C415.227570,461.001709 356.237427,461.016266 297.247437,460.946411  C293.578796,460.942078 290.844238,461.907593 287.831146,464.280579  C284.756317,466.702179 280.440094,468.620300 276.584412,468.782074  C263.609406,469.326355 250.581421,469.351685 237.609253,468.775452  C233.614807,468.597992 229.227219,466.536438 225.953110,464.088898  C223.047760,461.917023 220.453415,460.947632 216.969864,460.951294  C158.146469,461.013397 99.320824,460.730042 40.501331,461.212921  C28.272638,461.313232 16.741671,449.370361 16.793282,437.578735  C17.180563,349.095276 17.163887,260.608734 16.808821,172.125015  C16.762703,160.632629 28.251225,147.520477 40.303555,148.982925  C41.617275,149.142349 42.976986,148.899826 44.298244,149.024811  C47.162457,149.295715 48.670780,148.479706 49.508923,145.303162  C51.804573,136.602737 57.618706,130.926788 66.249611,128.439087  C76.435265,125.503265 86.727310,122.935226 96.901741,119.963013  C98.698753,119.438049 100.835152,118.071114 101.652252,116.491600  C117.677238,85.513763 142.676575,64.611252 174.821228,52.271084  C187.162048,47.533504 200.261917,45.066952 213.724045,44.923328  C230.078659,44.748840 246.221680,45.313965 261.901031,50.791630  C276.460052,55.877895 289.832092,63.002522 302.227783,72.731461  M480.981537,432.069489  C480.987274,346.574799 480.993134,261.080078 480.997040,175.585373  C480.997070,174.585678 481.062195,173.575241 480.943909,172.588150  C480.420319,168.218323 477.957458,165.564346 473.587036,165.104889  C470.845367,164.816650 468.048737,165.051193 465.001282,165.051193  C465.001282,167.354355 465.001282,169.160080 465.001282,170.965820  C465.001221,240.794876 464.975800,310.623962 465.028442,380.452942  C465.036346,390.932526 460.756836,398.658997 451.490356,403.672974  C450.408630,404.258240 449.263916,405.587463 449.029999,406.749268  C445.931427,422.139984 437.679993,428.998383 421.975311,428.999908  C382.144409,429.003815 342.313538,429.001251 302.482635,429.001282  C300.701996,429.001312 298.921387,429.001282 297.166107,429.001282  C297.166107,430.677979 297.166107,431.837036 297.034821,433.911896  C297.034821,437.507050 297.034821,441.102234 297.034821,444.997375  C299.341461,444.997375 300.983948,444.997375 302.626404,444.997375  C358.254333,444.997375 413.882233,444.998871 469.510162,444.995911  C478.831726,444.995422 481.289062,442.382141 480.981537,432.069489  M216.981323,432.118774  C217.689056,428.069763 214.742508,429.017334 212.632156,429.016266  C171.827332,428.995850 131.022507,429.023285 90.217705,428.988373  C76.665321,428.976776 67.281273,420.825867 65.031311,407.457123  C64.821426,406.209991 64.116417,404.509583 63.136784,404.011078  C52.490410,398.593658 48.873577,389.759644 48.905113,378.191467  C49.094002,308.907074 48.998730,239.621872 48.998722,170.336960  C48.998722,168.587799 48.998726,166.838638 48.998726,165.121033  C34.334789,164.670151 33.001263,165.943558 33.001266,179.684891  C33.001270,262.127289 33.000118,344.569672 33.008163,427.012085  C33.008358,429.006744 33.111141,431.001404 33.035736,433.835266  C33.029259,442.627686 35.415409,444.994934 44.340813,444.995514  C99.991386,444.999176 155.641953,444.997375 211.292526,444.997375  C213.065582,444.997375 214.838654,444.997375 216.833923,444.997375  C216.833923,440.590271 216.833923,436.793182 216.981323,432.118774  M265.000366,312.563416  C265.000366,343.950989 265.000366,375.338531 265.000366,407.331909  C268.056274,405.827789 270.400513,404.648315 272.766205,403.513519  C294.206085,393.229279 316.663910,386.291504 340.218689,382.912231  C372.829407,378.233795 404.968964,380.464844 436.699066,389.242523  C444.892487,391.509155 448.985840,388.436859 448.987976,380.129700  C449.007446,304.646454 448.976532,229.163177 449.048737,153.679977  C449.053772,148.414551 446.955627,145.448212 441.925568,143.748230  C425.604248,138.232193 408.881592,134.694473 391.755066,133.153351  C376.356873,131.767746 360.970245,131.960037 345.303650,134.307251  C358.215302,173.028595 355.360291,209.975082 334.663452,245.133408  C335.877319,246.081268 336.775452,246.805206 337.696564,247.498535  C356.188538,261.416992 374.924774,275.025482 393.094940,289.351959  C405.865601,299.421173 410.931427,313.415466 408.451660,329.358307  C405.535034,348.109711 393.753052,359.569702 375.675934,364.165192  C358.002411,368.658112 343.102112,363.508545 331.698181,349.174286  C325.791473,341.749847 320.260071,334.026794 314.560730,326.437408  C305.889008,314.890015 297.218750,303.341522 288.712738,292.013123  C280.559814,296.018707 272.850647,299.806274 265.000366,303.663147  C265.000366,306.263336 265.000366,308.925354 265.000366,312.563416  M237.262100,309.929718  C224.655350,309.595276 211.796860,310.754395 199.483566,308.678894  C130.397308,297.034088 74.228348,232.666046 89.804222,152.594696  C90.736946,147.799820 91.923264,143.054245 93.158699,137.539749  C86.095009,139.600967 79.707191,141.318085 73.416801,143.338516  C65.925514,145.744690 65.001755,147.216125 65.001610,155.261978  C65.000252,229.581406 65.000534,303.900848 65.002510,378.220276  C65.002548,379.719757 64.908684,381.231812 65.064522,382.716400  C65.570236,387.534058 69.170219,390.520630 73.997063,390.007111  C75.964104,389.797882 77.896713,389.190918 79.822701,388.680756  C132.927155,374.614075 184.643280,378.528381 234.946091,400.663818  C239.545273,402.687622 244.078476,404.861420 248.739227,407.010254  C248.739227,373.692841 248.739227,340.933075 248.739227,308.012878  C245.025116,308.657562 241.589478,309.253937 237.262100,309.929718  M261.592072,68.863258  C247.851898,63.876873 233.637665,61.083096 219.059357,61.085228  C151.575378,61.095093 98.217819,119.949280 103.772232,187.711105  C109.130440,253.079208 167.866226,299.327209 228.282059,294.219482  C285.329071,289.396545 327.415161,250.428741 335.258331,193.819702  C342.867279,138.901123 313.668396,88.949402 261.592072,68.863258  M368.068054,349.693329  C380.531433,347.927521 389.038818,341.337524 392.013306,328.911438  C395.043091,316.254364 390.021759,306.549438 379.825928,299.062378  C371.641266,293.052185 363.562073,286.898407 355.435455,280.809143  C345.597931,273.437866 335.759735,266.067444 327.409821,259.811493  C318.990601,268.035645 311.048737,275.793518 302.750946,283.899078  C302.377014,283.246704 302.646057,283.855408 303.034912,284.374329  C316.711945,302.625610 330.322845,320.927307 344.124146,339.084259  C349.853607,346.621918 357.802155,349.924652 368.068054,349.693329  M421.302826,413.004395  C429.545776,412.976562 431.600952,411.588837 432.813934,404.789398  C385.366730,391.586426 338.862183,394.009247 293.215393,413.004395  C335.594116,413.004395 377.972839,413.004395 421.302826,413.004395  M198.499939,413.003479  C205.928055,413.003479 213.356155,413.003479 220.784271,413.003479  C175.055893,393.930817 128.498032,391.656525 80.968323,404.988159  C82.689651,411.419128 84.712334,412.991760 91.025032,412.994904  C126.516670,413.012573 162.008331,413.003448 198.499939,413.003479  z"
    />
    <path
      fill="#FEFEFE"
      opacity={1}
      stroke="none"
      d=" M265.000366,312.075378  C265.000366,308.925354 265.000366,306.263336 265.000366,303.663147  C272.850647,299.806274 280.559814,296.018707 288.712738,292.013123  C297.218750,303.341522 305.889008,314.890015 314.560730,326.437408  C320.260071,334.026794 325.791473,341.749847 331.698181,349.174286  C343.102112,363.508545 358.002411,368.658112 375.675934,364.165192  C393.753052,359.569702 405.535034,348.109711 408.451660,329.358307  C410.931427,313.415466 405.865601,299.421173 393.094940,289.351959  C374.924774,275.025482 356.188538,261.416992 337.696564,247.498535  C336.775452,246.805206 335.877319,246.081268 334.663452,245.133408  C355.360291,209.975082 358.215302,173.028595 345.303650,134.307251  C360.970245,131.960037 376.356873,131.767746 391.755066,133.153351  C408.881592,134.694473 425.604248,138.232193 441.925568,143.748230  C446.955627,145.448212 449.053772,148.414551 449.048737,153.679977  C448.976532,229.163177 449.007446,304.646454 448.987976,380.129700  C448.985840,388.436859 444.892487,391.509155 436.699066,389.242523  C404.968964,380.464844 372.829407,378.233795 340.218689,382.912231  C316.663910,386.291504 294.206085,393.229279 272.766205,403.513519  C270.400513,404.648315 268.056274,405.827789 265.000366,407.331909  C265.000366,375.338531 265.000366,343.950989 265.000366,312.075378  z"
    />
    <path
      fill="#FEFEFE"
      opacity={1}
      stroke="none"
      d=" M237.707977,309.890015  C241.589478,309.253937 245.025116,308.657562 248.739227,308.012878  C248.739227,340.933075 248.739227,373.692841 248.739227,407.010254  C244.078476,404.861420 239.545273,402.687622 234.946091,400.663818  C184.643280,378.528381 132.927155,374.614075 79.822701,388.680756  C77.896713,389.190918 75.964104,389.797882 73.997063,390.007111  C69.170219,390.520630 65.570236,387.534058 65.064522,382.716400  C64.908684,381.231812 65.002548,379.719757 65.002510,378.220276  C65.000534,303.900848 65.000252,229.581406 65.001610,155.261978  C65.001755,147.216125 65.925514,145.744690 73.416801,143.338516  C79.707191,141.318085 86.095009,139.600967 93.158699,137.539749  C91.923264,143.054245 90.736946,147.799820 89.804222,152.594696  C74.228348,232.666046 130.397308,297.034088 199.483566,308.678894  C211.796860,310.754395 224.655350,309.595276 237.707977,309.890015  z"
    />
    <path
      fill="#D642D0"
      opacity={1}
      stroke="none"
      d=" M261.966431,68.970078  C313.668396,88.949402 342.867279,138.901123 335.258331,193.819702  C327.415161,250.428741 285.329071,289.396545 228.282059,294.219482  C167.866226,299.327209 109.130440,253.079208 103.772232,187.711105  C98.217819,119.949280 151.575378,61.095093 219.059357,61.085228  C233.637665,61.083096 247.851898,63.876873 261.966431,68.970078  M143.971329,231.494141  C163.133102,258.636200 190.325012,270.932343 222.527115,270.523865  C277.676270,269.824341 319.333740,220.861282 312.014618,166.101807  C307.142029,129.646225 286.881317,103.897049 252.505630,91.117844  C217.759186,78.200813 185.165543,84.857712 157.430878,109.143028  C123.482498,138.869247 118.116531,191.286942 143.971329,231.494141  z"
    />
    <path
      fill="#FFFFFF"
      opacity={1}
      stroke="none"
      d=" M33.166077,432.996063  C33.111141,431.001404 33.008358,429.006744 33.008163,427.012085  C33.000118,344.569672 33.001270,262.127289 33.001266,179.684891  C33.001263,165.943558 34.334789,164.670151 48.998726,165.121033  C48.998726,166.838638 48.998722,168.587799 48.998722,170.336960  C48.998730,239.621872 49.094002,308.907074 48.905113,378.191467  C48.873577,389.759644 52.490410,398.593658 63.136784,404.011078  C64.116417,404.509583 64.821426,406.209991 65.031311,407.457123  C67.281273,420.825867 76.665321,428.976776 90.217705,428.988373  C131.022507,429.023285 171.827332,428.995850 212.632156,429.016266  C214.742508,429.017334 217.689056,428.069763 216.450165,432.559052  C155.001358,432.998260 94.083717,432.997162 33.166077,432.996063  z"
    />
    <path
      fill="#FFFFFF"
      opacity={1}
      stroke="none"
      d=" M297.166107,432.996063  C297.166107,431.837036 297.166107,430.677979 297.166107,429.001282  C298.921387,429.001282 300.701996,429.001312 302.482635,429.001282  C342.313538,429.001251 382.144409,429.003815 421.975311,428.999908  C437.679993,428.998383 445.931427,422.139984 449.029999,406.749268  C449.263916,405.587463 450.408630,404.258240 451.490356,403.672974  C460.756836,398.658997 465.036346,390.932526 465.028442,380.452942  C464.975800,310.623962 465.001221,240.794876 465.001282,170.965820  C465.001282,169.160080 465.001282,167.354355 465.001282,165.051193  C468.048737,165.051193 470.845367,164.816650 473.587036,165.104889  C477.957458,165.564346 480.420319,168.218323 480.943909,172.588150  C481.062195,173.575241 480.997070,174.585678 480.997040,175.585373  C480.993134,261.080078 480.987274,346.574799 480.450256,432.534363  C419.001343,432.998199 358.083740,432.997131 297.166107,432.996063  z"
    />
    <path
      fill="#D641D0"
      opacity={1}
      stroke="none"
      d=" M367.643982,349.735535  C357.802155,349.924652 349.853607,346.621918 344.124146,339.084259  C330.322845,320.927307 316.711945,302.625610 303.034912,284.374329  C302.646057,283.855408 302.377014,283.246704 302.750946,283.899078  C311.048737,275.793518 318.990601,268.035645 327.409821,259.811493  C335.759735,266.067444 345.597931,273.437866 355.435455,280.809143  C363.562073,286.898407 371.641266,293.052185 379.825928,299.062378  C390.021759,306.549438 395.043091,316.254364 392.013306,328.911438  C389.038818,341.337524 380.531433,347.927521 367.643982,349.735535  z"
    />
    <path
      fill="#D741D1"
      opacity={1}
      stroke="none"
      d=" M33.100906,433.415649  C94.083717,432.997162 155.001358,432.998260 216.376465,432.997681  C216.833923,436.793182 216.833923,440.590271 216.833923,444.997375  C214.838654,444.997375 213.065582,444.997375 211.292526,444.997375  C155.641953,444.997375 99.991386,444.999176 44.340813,444.995514  C35.415409,444.994934 33.029259,442.627686 33.100906,433.415649  z"
    />
    <path
      fill="#D741D1"
      opacity={1}
      stroke="none"
      d=" M297.100464,433.453979  C358.083740,432.997131 419.001343,432.998199 480.376465,432.997620  C481.289062,442.382141 478.831726,444.995422 469.510162,444.995911  C413.882233,444.998871 358.254333,444.997375 302.626404,444.997375  C300.983948,444.997375 299.341461,444.997375 297.034821,444.997375  C297.034821,441.102234 297.034821,437.507050 297.100464,433.453979  z"
    />
    <path
      fill="#FCFCFC"
      opacity={1}
      stroke="none"
      d=" M420.827209,413.004395  C377.972839,413.004395 335.594116,413.004395 293.215393,413.004395  C338.862183,394.009247 385.366730,391.586426 432.813934,404.789398  C431.600952,411.588837 429.545776,412.976562 420.827209,413.004395  z"
    />
    <path
      fill="#FDFDFD"
      opacity={1}
      stroke="none"
      d=" M197.999969,413.003479  C162.008331,413.003448 126.516670,413.012573 91.025032,412.994904  C84.712334,412.991760 82.689651,411.419128 80.968323,404.988159  C128.498032,391.656525 175.055893,393.930817 220.784271,413.003479  C213.356155,413.003479 205.928055,413.003479 197.999969,413.003479  z"
    />
    <path
      fill="#FFFEFF"
      opacity={1}
      stroke="none"
      d=" M143.763702,231.199005  C118.116531,191.286942 123.482498,138.869247 157.430878,109.143028  C185.165543,84.857712 217.759186,78.200813 252.505630,91.117844  C286.881317,103.897049 307.142029,129.646225 312.014618,166.101807  C319.333740,220.861282 277.676270,269.824341 222.527115,270.523865  C190.325012,270.932343 163.133102,258.636200 143.763702,231.199005  M189.032883,150.089706  C189.690750,154.961594 192.576889,157.603790 197.387360,157.660843  C201.689606,157.711868 204.390533,154.331451 205.033798,148.812729  C206.081085,139.828003 212.369415,134.129715 221.466980,133.946823  C223.465439,133.906631 225.465714,133.914017 227.464569,133.941757  C236.316864,134.064590 242.685501,138.959167 244.593353,147.086548  C246.304199,154.374786 242.636795,161.809326 235.310608,165.761108  C232.381638,167.341003 229.312698,168.670135 226.432816,170.330765  C216.698700,175.943771 211.292740,187.429764 213.098709,198.407303  C213.859558,203.032227 216.966248,205.924438 221.096588,205.853088  C225.248856,205.781372 228.251480,202.869171 228.906815,198.206558  C229.045090,197.222839 229.074692,196.206528 229.010620,195.214523  C228.628632,189.300720 231.405045,185.433838 236.641190,182.993744  C239.654938,181.589294 242.637543,180.083527 245.500992,178.397217  C256.831848,171.724380 262.738403,158.911362 260.530243,146.038101  C257.983337,131.190247 248.850449,120.925476 235.312698,118.511597  C230.450409,117.644623 225.344406,117.679565 220.380966,117.928360  C202.454910,118.826935 190.105316,131.294708 189.032883,150.089706  M213.790359,218.572479  C211.981857,223.194153 213.350906,226.770721 217.636978,229.024200  C221.190796,230.892685 224.521057,229.933456 227.033157,226.968826  C229.732529,223.783203 229.732224,220.249557 227.193558,216.932556  C223.892654,212.619583 218.453033,213.055328 213.790359,218.572479  z"
    />
    <path
      fill="#D844D2"
      opacity={1}
      stroke="none"
      d=" M189.026962,149.670837  C190.105316,131.294708 202.454910,118.826935 220.380966,117.928360  C225.344406,117.679565 230.450409,117.644623 235.312698,118.511597  C248.850449,120.925476 257.983337,131.190247 260.530243,146.038101  C262.738403,158.911362 256.831848,171.724380 245.500992,178.397217  C242.637543,180.083527 239.654938,181.589294 236.641190,182.993744  C231.405045,185.433838 228.628632,189.300720 229.010620,195.214523  C229.074692,196.206528 229.045090,197.222839 228.906815,198.206558  C228.251480,202.869171 225.248856,205.781372 221.096588,205.853088  C216.966248,205.924438 213.859558,203.032227 213.098709,198.407303  C211.292740,187.429764 216.698700,175.943771 226.432816,170.330765  C229.312698,168.670135 232.381638,167.341003 235.310608,165.761108  C242.636795,161.809326 246.304199,154.374786 244.593353,147.086548  C242.685501,138.959167 236.316864,134.064590 227.464569,133.941757  C225.465714,133.914017 223.465439,133.906631 221.466980,133.946823  C212.369415,134.129715 206.081085,139.828003 205.033798,148.812729  C204.390533,154.331451 201.689606,157.711868 197.387360,157.660843  C192.576889,157.603790 189.690750,154.961594 189.026962,149.670837  z"
    />
    <path
      fill="#D847D2"
      opacity={1}
      stroke="none"
      d=" M213.954987,218.215546  C218.453033,213.055328 223.892654,212.619583 227.193558,216.932556  C229.732224,220.249557 229.732529,223.783203 227.033157,226.968826  C224.521057,229.933456 221.190796,230.892685 217.636978,229.024200  C213.350906,226.770721 211.981857,223.194153 213.954987,218.215546  z"
    />
  </svg>
);

export default DictionaryIcon;
