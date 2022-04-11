export const ContactForm = () => {
  return (
    <>
      <div class="container" style={{ width: '40%' }}>
        <form>
          <h1 class="nav justify-content-center">Add New Contact</h1>
          <div class="mb-3">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">
              Phone Number
            </label>
            <input type="text" class="form-control" id="phone" />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">
              Address
            </label>
            <input type="text" class="form-control" id="address" />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
