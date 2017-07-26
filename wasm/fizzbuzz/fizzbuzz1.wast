(module
  (func $log (import "imports" "log") (param i32))
  (func $fizz (import "imports" "fizz"))
  (func $buzz (import "imports" "buzz"))
  (func $fizzbuzz (import "imports" "fizzbuzz"))
  (func (export "fizzbuzz") (param i32)
    (local $i i32)
    i32.const 1
    set_local $i
    block
      loop
        get_local 0
        get_local $i
        i32.lt_u
        br_if 1

        block
          get_local $i
          i32.const 15
          i32.rem_u
          i32.const 0
          i32.eq
          if
            call $fizzbuzz
            br 1
          end

          get_local $i
          i32.const 3
          i32.rem_u
          i32.const 0
          i32.eq
          if
            call $fizz
            br 1
          end

          get_local $i
          i32.const 5
          i32.rem_u
          i32.const 0
          i32.eq
          if
            call $buzz
            br 1
          end

          get_local $i
          call $log
        end

        get_local $i
        i32.const 1
        i32.add
        set_local $i
        br 0
      end
    end))