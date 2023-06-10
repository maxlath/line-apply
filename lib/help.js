export const helpText = `
Examples:
  # Create a transform function in a ES format
  echo '
  export default function (line) {
    return line.toUpperCase()
  }
  ' > some_transform_function.mjs

  # Use it to transform a text file line by line
  cat some_txt | line-apply some_transform_function.mjs > some_txt_transformed

  # Note that that function could also be async

  # Preview transformation changes
  cat some_txt | line-apply some_transform_function.mjs --diff

  # Create a filter function
  echo '
  export default function (line) {
    return line.length > 5 && line.length < 10
  }
  ' > some_filter_function.mjs

  # Filter lines
  cat some_txt_transformed | line-apply some_filter_function.mjs --filter > lines_with_length_between_5_and_10

  # Create a transform function that takes extra arguments from the command line
  echo '
  export default function (line, bonus) {
    return line.length + bonus
  }
  ' > some_dynamic_transform_function.mjs

  cat some_txt | line-apply some_dynamic_transform_function.mjs 500 > lines_length_with_bonus_500
  cat some_txt | line-apply some_dynamic_transform_function.mjs 1000 > lines_length_with_bonus_1000
`
