@extends('main')
@section('content')
  <form method="POST" action="/plans">
    @csrf
    @include('plans.partials.form')
  </form>
@endsection