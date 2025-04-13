<!DOCTYPE html>
<html>
<head>
    <title>Lista de Disciplinas</title>
    <style>
        body {
            font-family: 'Rubik', sans-serif;
            margin: 40px;
            background-color: #ffffff;
            font-size: 14px;
            color: #212121;
        }

        /* .content {
            margin-top: 100px; /* Adjust to avoid overlapping with the header */
        } */

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .summary {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: row;
        }

        canvas {
            margin-right: 30px;
            width: 140px;
            height: 140px;
        }

        .semester {
            margin-bottom: 40px;
            margin-top: 40px;
            padding: 15px;
            padding-top: 0;
            border-radius: 5px;
        }

        hr {
            margin: 20px 0 0 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            /* border: 1px solid #e0e0e0; */
            padding: 8px;
            text-align: left;
        }

        .num {
            text-align: center;
        }

        th {
            font-weight: bold;
        }

        td {
            background-color: #ffffff;
        }

        tr:nth-child(odd) td {
            background-color: #e9e9e9;
        }

        .semester:nth-of-type(2n) {
            page-break-after: always;
            break-after: page;
        }

        .semester h2 {
            padding: 10px;
            border-radius: 4px;
            margin: 0 -15px 0;
            padding-left: 15px;
        }

        hr {
            border: none;
            border-top: 1px solid #e0e0e0;
            margin: 10px 0 20px 0;
        }

        p {
            font-weight: bold;
            padding-left: 8px;
        }

        .completed {
            color: #2A85CD;
        }

        .planned {
            color: #ff9800;
        }

        .pending {
            color: grey;
        }
    </style>
</head>

<body>

    <div class="content">
        <div class="header">
            <h1>Aurora</h1>
        </div>

        <div class="user-info">
            <p><strong>Nome do Aluno:</strong> {{ $user_name }}</p>
            <p><strong>Número USP:</strong> {{ $user_code }}</p>
            <p><strong>Data de Geração:</strong> {{ \Carbon\Carbon::now()->format('d/m/Y') }}</p>
        </div>
        <br>

        <div class="summary">
            <canvas id="canvas" width="300" height="300"></canvas>
            <div>
                <p><strong>Créditos Necessários:</strong> 195</p>
                <p class="completed"><strong>Créditos Totais Obtidos:</strong> {{ $completed_semesters->sum('total_credits') }}</p>
                <p class="planned"><strong>Créditos Totais Planejados:</strong> {{ $planned_semesters->sum('total_credits') }}</p>
                <p class="pending"><strong>Créditos Restantes:</strong> {{ 195 - $completed_semesters->sum('total_credits') - $planned_semesters->sum('total_credits') }}</p>
            </div>
        </div>

        <h2>Semestres completos</h2>
        @foreach ($completed_semesters as $semester_id => $semester)
        <div class='semester'>
            <h2>Semestre {{ $semester_id }}</h2>
            <table>
                <tr>
                    <th>Código</th>
                    <th>Nome da Disciplina</th>
                    <th>AU</th>
                    <th>TR</th>
                    <th>FREQ</th>
                    <th>NOTA</th>
                </tr>
                @foreach ($semester->slice(0, -1) as $subject)
                <tr>
                    <td>{{ $subject['code'] }}</td>
                    <td>{{ $subject['name'] }}</td>
                    <td class="num">{{ $subject['lecture_credits'] }}</td>
                    <td class="num">{{ $subject['work_credits'] }}</td>
                    <td class="num">100</td>
                    <td class="num">5</td>
                </tr>
                @endforeach
            </table>
            <p>Créditos totais: {{ $semester['total_credits'] }}</p>
        </div>
        @endforeach

        <h2>Semestres planejados</h2>
        @foreach ($planned_semesters as $semester_id => $semester)
        <div class='semester'>
            <h2>Semestre {{ $semester_id }}</h2>
            <table>
                <tr>
                    <th>Código</th>
                    <th>Nome da Disciplina</th>
                    <th>AU</th>
                    <th>TR</th>
                    <th>FREQ</th>
                    <th>NOTA</th>
                </tr>
                @foreach ($semester->slice(0, -1) as $subject)
                <tr>
                    <td>{{ $subject['code'] }}</td>
                    <td>{{ $subject['name'] }}</td>
                    <td class="num">{{ $subject['lecture_credits'] }}</td>
                    <td class="num">{{ $subject['work_credits'] }}</td>
                    <td class="num">100</td>
                    <td class="num">5</td>
                </tr>
                @endforeach
            </table>
            <p>Créditos totais: {{ $semester['total_credits'] }}</p>
        </div>
        @endforeach
    </div>
    <script>
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        console.log(canvas);

        let [width, height] = [canvas.width, canvas.height];
        let [cx, cy] = [width / 2, height / 2];

        // ctx.save();
        // ctx.translate(75, 75);
        // ctx.beginPath();
        // ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        // ctx.moveTo(110, 75);
        // ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        // ctx.moveTo(65, 65);
        // ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        // ctx.moveTo(95, 65);
        // ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        // ctx.stroke();
        // ctx.restore();

        let required_credits = 195;
        let completed_credits = "{{ $completed_semesters->sum('total_credits') }}";
        let planned_credits = "{{ $planned_semesters->sum('total_credits') }}";

        let angleRange = 270;
        let zeroAngle = 45;
        let completedPercentage = angleRange * completed_credits / required_credits;
        let plannedPercentage = angleRange * planned_credits / required_credits;
        let pendingPercentage = angleRange - completedPercentage - plannedPercentage;

        let startAng = zeroAngle;
        let endAng = startAng + completedPercentage;
        let radius = .4 * width;

        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, (startAng - 270) * Math.PI / 180, (endAng - 270) * Math.PI / 180, false);
        ctx.strokeStyle = "#2A85CD";
        ctx.stroke();

        startAng = endAng;
        endAng = startAng + plannedPercentage;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, (startAng - 270) * Math.PI / 180, (endAng - 270) * Math.PI / 180, false);
        ctx.strokeStyle = "#ff9800";
        ctx.stroke();

        startAng = endAng;
        endAng = startAng + pendingPercentage;
        console.log(endAng);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, (startAng - 270) * Math.PI / 180, (endAng - 270) * Math.PI / 180, false);
        ctx.strokeStyle = "grey";
        ctx.stroke();
    </script>
</body>

</html>
