import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import './css/Home.css';

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll('.home-section');
    const handleScroll = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight * 0.75) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Kích hoạt ngay khi tải trang

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    'Quản lý sản phẩm và danh mục với các endpoint linh hoạt: Thêm, chỉnh sửa, xóa sản phẩm và danh mục, tùy chỉnh thuộc tính (thành phần tự nhiên, nguồn gốc, công dụng).',
    'Hỗ trợ xác thực người dùng và quản lý quyền admin: Xác thực đa yếu tố (MFA), phân quyền chi tiết, nhật ký hoạt động admin.',
    'Quản lý giỏ hàng, đơn hàng, và thanh toán trực tuyến: Giỏ hàng lưu tạm, theo dõi trạng thái đơn hàng, tích hợp Visa, Mastercard ngoài MB Bank.',
    'Tích hợp với MB Bank để theo dõi giao dịch: Báo cáo giao dịch thời gian thực, mở rộng với các ngân hàng khác.',
    'Hỗ trợ gửi email thông báo và quản lý mã giảm giá: Gửi SMS, quản lý chiến dịch giảm giá theo thời gian hoặc khách hàng cụ thể.',
    'Quản lý kho hàng: Theo dõi tồn kho thời gian thực, cảnh báo hết hàng, hỗ trợ nhập/xuất kho.',
    'Tích hợp đa kênh bán hàng: Kết nối với Shopify, Shopee, Lazada để đồng bộ sản phẩm và đơn hàng.',
    'Quản lý đánh giá và nhận xét sản phẩm: Khách hàng để lại đánh giá, phản hồi, hiển thị trên trang sản phẩm.',
    'Hỗ trợ tùy chỉnh giao diện API: Tùy chọn tích hợp API vào ứng dụng đối tác với giao diện thân thiện.',
    'Phân tích dữ liệu và báo cáo: Báo cáo doanh thu, hành vi khách hàng, hiệu quả chiến dịch marketing.',
  ];

  return (
    <div className="api-home">
      <header className="home-section home-header">
        <div className="header-overlay">
          <h1 className="header-title">Chào mừng đến với API Pure Botanica</h1>
          <p className="subtitle">
            Tài liệu chính thức cho hệ thống API của <strong>Pure Botanica</strong> — nền tảng bán mỹ phẩm thiên nhiên.
          </p>
        </div>
      </header>

      <section className="home-section home-intro">
        <h2 className="section-title">Giới thiệu</h2>
        <p>
          API Pure Botanica cung cấp các công cụ mạnh mẽ để quản lý sản phẩm, danh mục, đơn hàng, và nhiều tính năng khác cho nền tảng bán mỹ phẩm thiên nhiên. Với thiết kế RESTful, API của chúng tôi dễ sử dụng, bảo mật, và hỗ trợ tích hợp nhanh chóng vào ứng dụng của bạn.
        </p>
      </section>

      <section className="home-section home-features">
        <h2 className="section-title">Các tính năng chính</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon"></span>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section home-quickstart">
        <h2 className="section-title">Bắt đầu nhanh</h2>
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

      <section className="home-section home-contact">
        <h2 className="section-title">Liên hệ hỗ trợ</h2>
        <p>
          Nếu bạn cần hỗ trợ hoặc có câu hỏi về API, hãy liên hệ với chúng tôi qua{' '}
          <a href="mailto:support@purebotanica.com">support@purebotanica.com</a>.
        </p>
      </section>
    </div>
  );
}

export default Home;