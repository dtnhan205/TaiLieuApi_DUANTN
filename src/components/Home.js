import { NavLink } from 'react-router-dom';
import './css/Home.css';

function Home() {
  return (
    <div className="api-home">
      <header className="home-header">
        <h1>Chào mừng đến với API Pure Botanica</h1>
        <p className="subtitle">
          Tài liệu chính thức cho hệ thống API của <strong>Pure Botanica</strong> — nền tảng bán mỹ phẩm thiên nhiên.
        </p>
      </header>

      <section className="home-intro">
        <h2>Giới thiệu</h2>
        <p>
          API Pure Botanica cung cấp các công cụ mạnh mẽ để quản lý sản phẩm, danh mục, đơn hàng, và nhiều tính năng khác cho nền tảng bán mỹ phẩm thiên nhiên. Với thiết kế RESTful, API của chúng tôi dễ sử dụng, bảo mật, và hỗ trợ tích hợp nhanh chóng vào ứng dụng của bạn.
        </p>
      </section>

      <section className="home-features">
        <h2>Các tính năng chính</h2>
        <ul>
          <li>Quản lý sản phẩm và danh mục với các endpoint linh hoạt.</li>
          <li>Hỗ trợ xác thực người dùng và quản lý quyền admin.</li>
          <li>Quản lý giỏ hàng, đơn hàng, và thanh toán trực tuyến.</li>
          <li>Tích hợp với MB Bank để theo dõi giao dịch.</li>
          <li>Hỗ trợ gửi email thông báo và quản lý mã giảm giá.</li>
        </ul>
      </section>

      <section className="home-quickstart">
        <h2>Bắt đầu nhanh</h2>
        <p>Để bắt đầu sử dụng API Pure Botanica, hãy làm theo các bước sau:</p>
        <ol>
          <li>Đăng ký tài khoản tại <a href="https://apicanhan.com" target="_blank" rel="noopener noreferrer">Pure Botanica</a>.</li>
          <li>Lấy API key từ dashboard quản trị.</li>
          <li>Khám phá <NavLink to="/apis">tài liệu API</NavLink> để xem chi tiết các endpoint.</li>
          <li>Sử dụng các công cụ như Postman hoặc cURL để gửi yêu cầu thử nghiệm.</li>
        </ol>
        <NavLink to="/apis" className="cta-button">
          Xem tài liệu API
        </NavLink>
      </section>

      <section className="home-contact">
        <h2>Liên hệ hỗ trợ</h2>
        <p>
          Nếu bạn cần hỗ trợ hoặc có câu hỏi về API, hãy liên hệ với chúng tôi qua{' '}
          <a href="mailto:support@purebotanica.com">support@purebotanica.com</a>.
        </p>
      </section>
    </div>
  );
}

export default Home;