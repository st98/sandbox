(module
  (type (func (param i32)))
  (type (func))

  (func $log (import "imports" "log") (type 0))
  (func $fizz (import "imports" "fizz"))
  (func $buzz (import "imports" "buzz"))
  (func $fizzbuzz (import "imports" "fizzbuzz"))
  (memory (export "mem") 1)

  (func (export "fizzbuzz") (type 0)
    (local $i i32)
    (local $tmp i32)

    i32.const 1
    set_local $i
    block
      loop
        get_local 0
        get_local $i
        i32.lt_u
        br_if 1

        i32.const 0
        get_local $i
        i32.const 1
        i32.sub
        i32.const 15
        i32.rem_u
        i32.add
        i32.load8_u
        tee_local $tmp
        i32.eqz
        if
          get_local $i
          call $log
        else
          get_local $tmp
          i32.const 1
          i32.sub
          call_indirect 1
        end

        get_local $i
        i32.const 1
        i32.add
        set_local $i
        br 0
      end
    end)

  (table anyfunc (elem $fizz $buzz $fizzbuzz))
  (data (i32.const 0) "\00\00\01\00\02\01\00\00\01\02\00\01\00\00\03"))