subject_id: <input type="number" name="subject_id" value="{{ old('subject_id', $plan->subject_id) }}">
semester:   <input type="number" name="semester" value="{{ old('semester', $plan->semester) }}">

<button type="submit">Send</button>