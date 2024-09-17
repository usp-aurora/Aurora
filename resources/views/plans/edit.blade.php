@extends('main')
@section('content')
  <form method="POST" action="/plans/{{ $plan->id }}">
    @csrf
    @method('patch')
    @include('plans.partials.form')
  </form>
  <form action="/plans/{{ $plan->id }} " method="post">
      @csrf
      @method('delete')
      <button type="submit" onclick="return confirm('Are you sure?');">Delete</button> 
    </form>
@endsection